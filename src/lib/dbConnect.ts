import mongoose from 'mongoose';

// =================================================================
//  CRITICAL: PLEASE REPLACE THIS WITH YOUR OWN CONNECTION STRING
// =================================================================
// You MUST replace the following connection string with your own from
// MongoDB Atlas. Your app will not connect to the database otherwise.
//
// To get your connection string:
// 1. Go to your MongoDB Atlas dashboard.
// 2. Click "Database" in the left-hand menu.
// 3. Click the "Connect" button for your cluster.
// 4. Select "Drivers".
// 5. Copy the connection string and paste it below.
//
// Make sure to replace `<user>`, `<password>`, and the cluster URL
// with your actual database credentials and name.
// For example:
// const MONGO_URI = 'mongodb+srv://myuser:mypassword@mycluster.mongodb.net/mydatabase?retryWrites=true&w=majority';
//
// Also, ensure you have configured Network Access in MongoDB Atlas to
// allow connections from all IP addresses (0.0.0.0/0).
// =================================================================
const MONGO_URI = 'mongodb+srv://user:pass@cluster0.example.com/test?retryWrites=true&w=majority';

let cached: {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
} = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    // TEMPORARILY COMMENTED OUT TO PREVENT CRASH
    // Once you add your real MONGO_URI, uncomment the following line
    // cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
    //   console.log('MongoDB connected successfully!');
    //   return mongoose;
    // }).catch(err => {
    //   console.error('MongoDB connection error:', err);
    //   cached.promise = null; 
    //   throw err;
    // });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
