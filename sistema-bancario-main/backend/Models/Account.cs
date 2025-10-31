namespace BankingSystem.Models
{
    public class Account
    {
        public int Id { get; set; }
        public string Holder { get; set; } = string.Empty;
        public decimal Balance { get; set; }
    }
}

