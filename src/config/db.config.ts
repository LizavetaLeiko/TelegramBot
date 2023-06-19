import mongoose from 'mongoose';

export const connectionToDb = async (dbUrl: string) => {
  try {
    mongoose.set({ strictQuery: true });
    await mongoose.connect(dbUrl);
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};
