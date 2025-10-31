using System.Data;

namespace BankingSystem.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int AccountId { get; set; }
        public decimal Value { get; set; }
        public string Type { get; set; } = string.Empty; // deposit, withdraw, transfer
        public DateTime Date { get; set; } = DateTime.Now;
    }
}
