using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend_csharp.Controllers
{
    [ApiController]
    [Route("api/v1/accounts")]
    public class CompanyAccountsController : ControllerBase
    {
        private readonly IMongoCollection<BsonDocument> _accounts;

        public CompanyAccountsController()
        {
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoDbDatabaseName");
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            _accounts = db.GetCollection<BsonDocument>("CompanyAccounts");
        }

        // ✅ GET /api/v1/accounts?userDataID=IP083
        [HttpGet]
        public IActionResult GetAllAccounts([FromQuery] string userDataID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);
            var accounts = _accounts.Find(filter).ToList();
            return Ok(accounts);
        }

        // ✅ GET /api/v1/accounts/{accountId}?userDataID=IP083
        [HttpGet("{accountId}")]
        public IActionResult GetAccountById(string accountId, [FromQuery] string userDataID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("accountId", accountId) &
                         Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);

            var account = _accounts.Find(filter).FirstOrDefault();
            if (account == null) return NotFound();
            return Ok(account);
        }

        // ✅ POST /api/v1/accounts
        [HttpPost]
        public IActionResult AddAccount([FromBody] CompanyAccountRequest request)
        {
            var accountDoc = new BsonDocument
            {
                { "accountId", request.AccountId }, // Pass in custom ID
                { "companyName", request.CompanyName },
                { "email", request.Email },
                { "password", request.Password },
                { "portalUrl", request.PortalUrl },
                { "userDataID", request.UserDataID }
            };

            _accounts.InsertOne(accountDoc);
            return Ok(accountDoc);
        }

        // ✅ PUT /api/v1/accounts/{accountId}?userDataID=IP083
        [HttpPut("{accountId}")]
        public IActionResult UpdateAccount(string accountId, [FromQuery] string userDataID, [FromBody] CompanyAccountRequest request)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("accountId", accountId) &
                         Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);

            var update = Builders<BsonDocument>.Update
                .Set("companyName", request.CompanyName)
                .Set("email", request.Email)
                .Set("password", request.Password)
                .Set("portalUrl", request.PortalUrl);

            var result = _accounts.UpdateOne(filter, update);
            if (result.MatchedCount == 0) return NotFound();

            return Ok(new { updated = true });
        }

        // ✅ DELETE /api/v1/accounts/{accountId}?userDataID=IP083
        [HttpDelete("{accountId}")]
        public IActionResult DeleteAccount(string accountId, [FromQuery] string userDataID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("accountId", accountId) &
                         Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);

            var result = _accounts.DeleteOne(filter);
            if (result.DeletedCount == 0) return NotFound();

            return Ok(new { deleted = true });
        }
    }

    public class CompanyAccountRequest
    {
        public string AccountId { get; set; } // Custom account ID
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PortalUrl { get; set; }
        public string UserDataID { get; set; }
    }
}
