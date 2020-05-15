namespace Parm.FrontDev2.Models
{
    public class AccountModel
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public decimal Balance { get; set; }
        public string Currency { get; set; }
    }
}
