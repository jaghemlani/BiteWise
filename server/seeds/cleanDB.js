// const mongoose = require('mongoose');
// const db = require('../config/connection');

// module.exports = async (modelName, collectionName) => {
//   try {
//     const connection = mongoose.connection;
//     const collections = await connection.db.listCollections({ name: collectionName }).toArray();

//     if (collections.length) {
//       await connection.db.dropCollection(collectionName);
//     }
//   } catch (err) {
//     if (err.codeName === 'NamespaceNotFound') {
//       console.log(`Collection ${collectionName} does not exist, skipping drop.`);
//     } else {
//       throw err;
//     }
//   }
// };

const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    throw err;
  }
}


// Usage example
// (async () => {
//   try {
//     await db.once('open', async () => {
//       await module.exports('User', 'users');
//       await module.exports('Restaurant', 'restaurants');
//       await module.exports('Review', 'reviews');
//       console.log('Database cleaned successfully.');
//       mongoose.connection.close();
//     });
//   } catch (err) {
//     console.error('Error cleaning database:', err);
//     mongoose.connection.close();
//   }
// })();
