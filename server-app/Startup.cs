using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using NSwag;
using NSwag.AspNetCore;
using NSwag.Generation.Processors.Security;
using Parm.FrontDev2.Models;
using Parm.FrontDev2.Infrastructure;
using Parm.FrontDev2.Repositories;
using Parm.FrontDev2.Services;
using Parm.FrontDev2.Mocks;

namespace Parm.FrontDev2
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services
        .AddControllersWithViews()
        .AddNewtonsoftJson();

      services.AddOpenApiDocument();

      services.AddControllersWithViews().AddJsonOptions(opts => { opts.JsonSerializerOptions.IgnoreNullValues = true; });

      services.AddSingleton<IDataContext, DataContext>();
      services.AddTransient<IUnitOfWork, UnitOfWork>();
      services.AddTransient<IAccountService, AccountService>();
      services.AddTransient<IUserService, UserService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Home/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }
      app.UseHttpsRedirection();
      app.UseStaticFiles();

      app.UseRouting();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller=Home}/{action=Index}/{id?}");
      });

      app.UseOpenApi();
      app.UseSwaggerUi3();

      app.UseSpa(spa =>
      {
        string strategy = Configuration.GetValue<string>("DevTools:ConnectionStrategy");
        if (strategy == "proxy")
        {
          spa.UseProxyToSpaDevelopmentServer("http://127.0.0.1:4200");
        }
        else if (strategy == "managed")
        {
          spa.Options.SourcePath = "../client-app";
          spa.UseAngularCliServer("start");
        }
      });
    }
  }
}
