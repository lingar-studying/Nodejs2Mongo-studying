const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';  // MongoDB URL
const dbName = 'myStore';


exports.addItemToDb =  async function (item, collectionName) {
    const client = new MongoClient(url);   

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB - addItemToDb');

        const db = client.db(dbName);
        const collection = db.collection(collectionName);  // Example collection
        const result = await collection.insertOne(newOrder);
        console.log('Inserted document:', result);

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}