import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://ahmadaatif6_db_user:Sanae1UmgKsWGej0@og-dialogues-cluster.j3iogzd.mongodb.net/?retryWrites=true&w=majority&appName=og-dialogues-cluster';

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  );
}

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
    
    cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
      console.log('MongoDB connected successfully!');
      return mongoose;
    }).catch(err => {
      console.error('MongoDB connection error:', err);
      cached.promise = null; 
      throw err;
    });
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
