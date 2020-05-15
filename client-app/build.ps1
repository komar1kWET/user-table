# Execute regardless of policy:
# pwsh.exe -ExecutionPolicy RemoteSigned -NoProfile -File .\build.ps1
# Requires nodejs, git.

param (
    [switch]$e2e = $false
)

$ErrorActionPreference = "Stop"
if ($PSVersionTable.PSVersion.Major -lt 6) { Write-Host -f Red "This script requires PowerShell 6 or newer."; exit 1 }

function Log {
    Write-Output "$(get-date) $args"
}

function HandleError {
    Write-Host -f Red "Build failed"
    exit 1
}

function CacheModules {
    try {
        if (Test-Path $ModuleCacheBase) {
            Log "Moving node modules to cache."
            if (-Not (Test-Path $ModuleCache)) {
                New-Item -Path $ModuleCache -ItemType "directory"
            }
            Move-Item -Path node_modules -Destination $ModuleCache -Force

            if (-Not (Test-Path $ModuleCacheConfig)) {
                New-Item -Path $ModuleCacheConfig -ItemType "directory"
            }
            Copy-Item $InstalledPackages -Destination $ModuleCacheConfig -Force
            Copy-Item $PackageLock -Destination $ModuleCacheConfig -Force
        }
        else {
            Log "Module cache folder '$ModuleCacheBase' does not exist, skipping."
        }
    }
    catch {
        Log "Error while caching node modules: $_"
        Log "Cleaning up module cache."
        if (Test-Path $ModuleCache) { Remove-Item $ModuleCache -Force -Recurse }
        if (Test-Path $ModuleCacheConfig) { Remove-Item $ModuleCacheConfig -Force -Recurse }
        HandleError
    }
}

try {
    Push-Location $PSScriptRoot
    $InstalledPackages = 'package.json.INSTALLED'
    $PackageLock = 'package-lock.json'
    $EscapedPath = $PSScriptRoot -replace ':', '_' -replace '\\', '_'
    $ModuleCacheBase = 'D:\NodeModulesCache'
    $ModuleCache = "$ModuleCacheBase\$EscapedPath"
    $ModuleCacheConfig = $ModuleCache + "_CONFIG"

    if (Test-Path $ModuleCache) {
        Log 'Using cached node modules.'
        Move-Item -Path "$ModuleCache\node_modules" -Force
        Copy-Item "$ModuleCacheConfig\*" -Force
    }
    else {
        Log 'Node module cache not found.'
    }

    Log "Checking if package update is required."
    $NpmInstall = $false
    if (-Not (Test-Path "node_modules\.bin")) { $NpmInstall = $true }
    if (-Not (Test-Path $InstalledPackages)) { $NpmInstall = $true }
    if (-Not $NpmInstall -And (Compare-Object -ReferenceObject $(Get-Content "package.json") -DifferenceObject $(Get-Content $InstalledPackages))) { $NpmInstall = $true }

    if ($NpmInstall) {
        Log "npm install..."
        if (Test-Path "node_modules") { Remove-Item "node_modules" -Force -Recurse }
        if (Test-Path $PackageLock) { Remove-Item $PackageLock -Force }
        $startNpm = Start-Process -FilePath "npm" -ArgumentList "install" -NoNewWindow -Wait -PassThru; $startNpm.ExitCode
        if ($startNpm.ExitCode -ne 0) { throw }
        Copy-Item "package.json" $InstalledPackages -Force
    }
    else {
        Log "Package configuration has not changed."
    }
}
catch {
    Pop-Location
    HandleError
}

try {
    Log "Build..."
    if ($Env:CCNetLabel) {
        $ProdEnv = "src\environments\environment.prod.ts";
        (Get-Content $ProdEnv) -replace '@VERSION@', "$Env:CCNetLabel" | Set-Content $ProdEnv
    }

    $NpmCmd = if ($e2e) { "run my-e2e" } else { "run my-ci" }
    $StartNpm = Start-Process -FilePath "npm" -ArgumentList $NpmCmd -NoNewWindow -Wait -PassThru; $StartNpm.ExitCode
    if ($StartNpm.ExitCode -ne 0) { throw }
    Log "Done."
    Write-Host -f Green "Build successful"
}
catch {
    HandleError
}
finally {
    CacheModules
    Pop-Location
}
