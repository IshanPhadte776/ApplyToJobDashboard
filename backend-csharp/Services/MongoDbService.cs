using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace backend_csharp.Services
{
    public class MongoDbService
    {
        public IMongoDatabase Database { get; }

        public MongoDbService(IConfiguration configuration)
        {
            var connectionString = Environment.GetEnvironmentVariable("MongoDbConnectionString");
            var databaseName = Environment.GetEnvironmentVariable("MongoDbDatabaseName");
            Console.WriteLine($"MongoDbService: Using connection string: {connectionString}");
            Console.WriteLine($"MongoDbService: Using database name: {databaseName}");
            var client = new MongoClient(connectionString);
            Database = client.GetDatabase(databaseName);
        }
    }
}
