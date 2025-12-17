import mongoose from 'mongoose';

const MONGO_URI = 'mongodb+srv://user:pass@cluster0.sqyia.mongodb.net/test?retryWrites=true&w=majority';

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable'
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
      // Invalidate the cache on connection failure
      cached.promise = null; 
      throw err;
    });
  }
  
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // Invalidate the cache if the promise was rejected
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
