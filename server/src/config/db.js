const { MongoClient, ServerApiVersion } = require('mongodb');

const { DB_USER, DB_PASS, DB_NAME, MONGODB_URI } = process.env;

if (!MONGODB_URI && (!DB_USER || !DB_PASS)) {
  console.error('❌ Missing required env vars: DB_USER and DB_PASS (or MONGODB_URI)');
  process.exit(1);
}

const user = DB_USER ? encodeURIComponent(DB_USER) : '';
const pass = DB_PASS ? encodeURIComponent(DB_PASS) : '';
const name = DB_NAME || 'QuickHire';
const uri = MONGODB_URI || `mongodb+srv://${user}:${pass}@cluster0.ar9nb8e.mongodb.net/${name}?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('✅ Successfully connected to MongoDB Atlas!');
    db = client.db(name);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) throw new Error('Database not initialized. Call connectDB() first.');
  return db;
};

const closeDB = async () => {
  await client.close();
  console.log('🔌 MongoDB connection closed.');
};

module.exports = { connectDB, getDB, closeDB };
