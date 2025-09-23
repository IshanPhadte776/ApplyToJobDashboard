package com.IshanPhadte.ApplyToJobDashboard.controller;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

@RestController
@RequestMapping("/api/test")
public class TestController {

    private final MongoClient mongoClient;

    public TestController(MongoClient mongoClient) {
        this.mongoClient = mongoClient;
    }

    // Endpoint 1: Hello world
    //curl -Method GET "http://localhost:8080/api/test/hello" `
    //-Headers @{ "Content-Type" = "application/json" }

    @GetMapping("/hello")
    public String helloWorld() {
        return "Hello World";
    }

    // Endpoint 2: List all collections with document counts
    //curl -Method GET "http://localhost:8080/api/test/collections-info" `
    // -Headers @{ "Content-Type" = "application/json" }

    @GetMapping("/collections-info")
    public List<CollectionInfo> getCollectionsInfo() {
        System.out.println("--- TestController: getCollectionsInfo called ---");

        MongoDatabase db = mongoClient.getDatabase("ApplyToJobDashboard");
        System.out.println("Database: " + db.getName());

        List<CollectionInfo> result = new ArrayList<>();
        for (String name : db.listCollectionNames()) {
            System.out.println("Processing collection: " + name);
            MongoCollection<Document> collection = db.getCollection(name);
            long count = collection.countDocuments();
            System.out.println("Collection: " + name + ", Document Count: " + count);
            result.add(new CollectionInfo(name, count));
        }

        System.out.println("--- End of getCollectionsInfo ---");
        return result;
    }

    // Inner class for collection info
    public static class CollectionInfo {
        private String collectionName;
        private long documentCount;

        public CollectionInfo(String collectionName, long documentCount) {
            this.collectionName = collectionName;
            this.documentCount = documentCount;
        }

        public String getCollectionName() {
            return collectionName;
        }

        public long getDocumentCount() {
            return documentCount;
        }
    }
}
