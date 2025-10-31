using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankingSystem.Data;
using BankingSystem.Models;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;

namespace BankingSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly BankingContext _context;

        public AccountsController(BankingContext context)
        {
            _context = context;
        }

        // Create account
        [HttpPost("create")]
        public async Task<IActionResult> CreateAccount([FromBody] Account account)
        {
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();
            return Ok(account);
        }

        // Deposit
        [HttpPost("{id}/deposit")]
        public async Task<IActionResult> Deposit(int id, [FromQuery] decimal value)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null) return NotFound("Account not found.");

            account.Balance += value;

            _context.Transactions.Add(new Transaction
            {
                AccountId = id,
                Value = value,
                Type = "Deposit."
            });

            await _context.SaveChangesAsync();
            return Ok(account);
        }

        // Withdraw
        [HttpPost("{id}/withdraw")]
        public async Task<IActionResult> Withdraw(int id, [FromQuery] decimal value)
        {
            var account = await _context.Accounts.FindAsync(id);
            if (account == null) return NotFound("Account not found.");
            if (account.Balance < value) return BadRequest("Insufficient balance.");

            account.Balance -= value;

            _context.Transactions.Add(new Transaction
            {
                AccountId = id,
                Value = value,
                Type = "Withdraw."
            });

            await _context.SaveChangesAsync();
            return Ok(account);
        }

        // Transfer
        [HttpPost("{idOrigin}/transfer/{idDestination}")]
        public async Task<IActionResult> Transfer(int idOrigin, int idDestination, [FromQuery] decimal value)
        {
            var origin = await _context.Accounts.FindAsync(idOrigin);
            var destination = await _context.Accounts.FindAsync(idDestination);

            if (origin == null || destination == null) return NotFound("Account (origin or destination) not found.");
            if (origin.Balance < value) return BadRequest("Insufficient balance.");

            origin.Balance -= value;
            destination.Balance += value;

            _context.Transactions.Add(new Transaction
            {
                AccountId = idOrigin,
                Value = value,
                Type = $"Transfer to account {idDestination}."
            });

            _context.Transactions.Add(new Transaction
            {
                AccountId = idDestination,
                Value = value,
                Type = $"Transfer received from account {idOrigin}."
            });

            await _context.SaveChangesAsync();
            return Ok(new { origin, destination });
        }

        // List accounts
        [HttpGet]
        public async Task<IActionResult> ListAccounts()
        {
            return Ok(await _context.Accounts.ToListAsync());
        }

        // List transactions
        [HttpGet("{id}/transactions")]
        public async Task<IActionResult> ListTransactions(int id)
        {
            var transactions = await _context.Transactions
                .Where(t => t.AccountId == id)
                .ToListAsync();

            return Ok(transactions);
        }
    }
}
