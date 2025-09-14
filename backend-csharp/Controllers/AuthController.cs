using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend_csharp.Controllers
{


    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        //curl -Method POST "http://localhost:5135/api/v1/auth/register" `
        //-Headers @{"Content-Type"="application/json"} `
        //-Body '{"username": "Ishan Phadte", "password": "password", "userDataID": "IP083"}'
        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // For demo: connect to MongoDB and insert user
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoDbDatabaseName");
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            var users = db.GetCollection<BsonDocument>("Users");
            var userDoc = new BsonDocument {
                { "username", request.Username },
                { "password", request.Password },
                { "userDataID", request.UserDataID }
            };
            users.InsertOne(userDoc);
            var userId = userDoc["_id"].ToString();
            return Ok(new { userId, username = request.Username });
        }

        //curl -Method POST "http://localhost:5135/api/v1/auth/login" `
        //-Headers @{ "Content-Type" = "application/json" } `
        //-Body '{"username":"Ishan Phadte","password":"password"}'

        //curl -Method POST "http://localhost:5135/api/v1/auth/login" `
        //-Headers @{ "Content-Type" = "application/json" } `
        //-Body '{"username":"Ishan Phadte","password":"wrongpassword"}'



        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoDbDatabaseName");
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            var users = db.GetCollection<BsonDocument>("Users");

            var filter = Builders<BsonDocument>.Filter.Eq("username", request.Username) &
                         Builders<BsonDocument>.Filter.Eq("password", request.Password);

            var user = users.Find(filter).FirstOrDefault();

            bool isAuthenticated = user != null;

            return Ok(new { success = isAuthenticated });
        }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string UserDataID { get; set; }
    }

     public class LoginRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
