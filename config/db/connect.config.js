import mongoose from 'mongoose';

const baseMongooseOpts = {
  serverSelectionTimeoutMS: 10000,
  bufferCommands: false
};

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw Object.assign(new Error('MONGO_URI is not defined'), { status: 500 });
  await mongoose.connect(uri, baseMongooseOpts);
  console.log('🗄️  MongoDB conectado');
};

export const connectMongoDBAtlas = async () => {
  return connectDB();
};

export const connectAuto = async () => {
  const target = (process.env.MONGO_TARGET || 'LOCAL').toUpperCase();
  if (target === 'ATLAS') await connectMongoDBAtlas();
  else await connectDB();
};
