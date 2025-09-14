using Microsoft.AspNetCore.Mvc;
using backend_csharp.Services;
using MongoDB.Bson;
using MongoDB.Driver;

namespace backend_csharp.Controllers
{
    [ApiController]
    [Route("api/test")]
    public class TestController : ControllerBase
    {
        private readonly MongoDbService _mongoDbService;

        public TestController(MongoDbService mongoDbService)
        {
            _mongoDbService = mongoDbService;
        }

        [HttpGet("collections-info")]
        public IActionResult GetCollectionsInfo()
        {
            Console.WriteLine("--- TestController: GetCollectionsInfo called ---");
            var db = _mongoDbService.Database;
            Console.WriteLine($"Database: {db.DatabaseNamespace.DatabaseName}");
            var collectionNames = db.ListCollectionNames().ToList();
            Console.WriteLine($"Collections found: {string.Join(", ", collectionNames)}");
            var result = new List<object>();
            foreach (var name in collectionNames)
            {
                Console.WriteLine($"Processing collection: {name}");
                var collection = db.GetCollection<BsonDocument>(name);
                var count = collection.CountDocuments(new BsonDocument());
                Console.WriteLine($"Collection: {name}, Document Count: {count}");
                result.Add(new { CollectionName = name, DocumentCount = count });
            }
            Console.WriteLine("--- End of GetCollectionsInfo ---");
            return Ok(result);
        }
    }
}
