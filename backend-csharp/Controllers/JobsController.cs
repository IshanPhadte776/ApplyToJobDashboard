using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend_csharp.Controllers
{
    [ApiController]
    [Route("api/v1/jobs")]
    public class JobsController : ControllerBase
    {
        private readonly IMongoCollection<BsonDocument> _jobs;

        public JobsController()
        {
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoDbDatabaseName");
            var client = new MongoClient(connectionString);
            var db = client.GetDatabase(databaseName);
            _jobs = db.GetCollection<BsonDocument>("JobApplications");
        }

        // ✅ GET /api/v1/jobs?userDataID=IP083
        [HttpGet]
        public IActionResult GetAllJobsForUser([FromQuery] string userDataID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);
            var jobs = _jobs.Find(filter).ToList();

            // Convert BsonDocument to dictionary to avoid serialization errors
            var jobList = jobs.Select(job => job.ToDictionary()).ToList();

            return Ok(jobList);
        }


        //curl -Method POST "http://localhost:5135/api/v1/jobs" `
        //-Headers @{ "Content-Type" = "application/json" } `
        //-Body '{"jobId":"IP083-3163","jobTitle":"Junior SWE","company":"CIBC","status":"Applied","dateApplied":"2025-09-10","accountNeeded":false,"jobUrl":"https://www.linkedin.com/jobs/view/4298287896","userDataID":"IP083"}'

        [HttpPost]
        public IActionResult AddJob([FromBody] JobRequest request)
        {
            var jobDoc = new BsonDocument {
                { "jobId", request.JobID },
                { "jobTitle", request.JobTitle },
                { "company", request.Company },
                { "status", request.Status },
                { "dateApplied", request.DateApplied },
                { "accountNeeded", request.AccountNeeded },
                { "jobUrl", request.JobUrl },
                { "userDataID", request.UserDataID }
            };

            _jobs.InsertOne(jobDoc);
            return Ok(new { jobId = request.JobID });

        }

        [HttpPut("{id}")]
        public IActionResult UpdateJob(string id, [FromBody] JobRequest request)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("_id", ObjectId.Parse(id)) &
                         Builders<BsonDocument>.Filter.Eq("userDataID", request.UserDataID);

            var update = Builders<BsonDocument>.Update
                .Set("jobTitle", request.JobTitle)
                .Set("company", request.Company)
                .Set("status", request.Status)
                .Set("dateApplied", request.DateApplied)
                .Set("accountNeeded", request.AccountNeeded)
                .Set("jobUrl", request.JobUrl);

            var result = _jobs.UpdateOne(filter, update);
            if (result.MatchedCount == 0) return NotFound();

            return Ok(new { updated = true });
        }

        [HttpDelete("{jobId}")]
        public IActionResult DeleteJob(string jobId, [FromQuery] string userDataID)
        {
            var filter = Builders<BsonDocument>.Filter.Eq("jobId", jobId) &
                        Builders<BsonDocument>.Filter.Eq("userDataID", userDataID);

            var result = _jobs.DeleteOne(filter);
            if (result.DeletedCount == 0) return NotFound();

            return Ok(new { deleted = true });
        }

    }

    public class JobRequest
    {
        public string JobID { get; set; }
        public string JobTitle { get; set; }
        public string Company { get; set; }
        public string Status { get; set; }
        public string DateApplied { get; set; }
        public bool AccountNeeded { get; set; }
        public string JobUrl { get; set; }
        public string UserDataID { get; set; }
    }
}
