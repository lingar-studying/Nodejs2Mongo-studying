const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';  // MongoDB URL
// const dbName = 'mydatabase';  // Database name
const dbName = 'newDB';
async function connectToMongo() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const collection = db.collection('newCollection');  // Example collection

        // Example query: Find all documents in 'orders' collection
        const documents = await collection.find({}).toArray();
        console.log("documents = ", documents);

    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}

async function connectToMongo2() {
    const client = new MongoClient(url);

    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB2');

        const db = client.db(dbName);
        const collection = db.collection('newCollection');  // Example collection

        const newOrder = { customer: 'John Doe', total: 250 };
        const result = await collection.insertOne(newOrder);
        console.log('Inserted document:', result);

        



    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    } finally {
        // Close the connection
        await client.close();
    }
}
module.exports = {connectToMongo,connectToMongo2};