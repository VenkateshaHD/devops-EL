import mongoose from "mongoose";
import { ENV } from "./src/lib/env.js";

// Connect to MongoDB
await mongoose.connect(ENV.MONGO_URI);
console.log("✅ Connected to MongoDB");

// Get database name
const dbName = mongoose.connection.db.databaseName;
console.log(`\n📊 Database: ${dbName}`);

// List all collections
const collections = await mongoose.connection.db.listCollections().toArray();
console.log(`\n📁 Collections (${collections.length}):`);
collections.forEach(col => console.log(`  - ${col.name}`));

// Count documents in each collection
console.log(`\n📈 Document Counts:`);
for (const col of collections) {
    const count = await mongoose.connection.db.collection(col.name).countDocuments();
    console.log(`  - ${col.name}: ${count} documents`);
}

// Show sample data from users
console.log(`\n👥 Sample Users:`);
const users = await mongoose.connection.db.collection('users').find().limit(5).toArray();
users.forEach(user => {
    console.log(`  - ${user.email || user.username} (ID: ${user._id})`);
});

// Show sample messages
console.log(`\n💬 Sample Messages:`);
const messages = await mongoose.connection.db.collection('messages').find().limit(5).toArray();
messages.forEach(msg => {
    console.log(`  - ${msg.text?.substring(0, 50) || 'No text'}... (${msg.createdAt})`);
});

console.log(`\n✅ Database check complete!`);
process.exit(0);
