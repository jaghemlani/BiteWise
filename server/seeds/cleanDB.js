const mongoose = require('mongoose');

const cleanDB = async (collectionName) => {
  try {
    const connection = mongoose.connection;
    const collections = await connection.db.listCollections({ name: collectionName }).toArray();

    if (collections.length) {
      await connection.db.dropCollection(collectionName);
      console.log(`Dropped collection: ${collectionName}`);
    } else {
      console.log(`Collection ${collectionName} does not exist, skipping drop.`);
    }
  } catch (err) {
    console.error(`Error dropping collection ${collectionName}:`, err);
    throw err;
  }
};

module.exports = cleanDB;
