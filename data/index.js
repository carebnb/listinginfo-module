const mongodb = require('mongodb');

const uri = 'mongodb://172.17.0.2/carebnb';
// Connect to database
const connect = (type, cb, data) => {
  mongodb.MongoClient.connect(uri, (connectionErr, client) => {
    if (connectionErr) throw connectionErr;
    const db = client.db('carebnb');
    const homeData = db.collection('homeData');
    // Query database
    if (type === 'get') {
      homeData.find().toArray((err, result) => {
        if (err) cb(err);
        cb(null, result);
      });
    }
    if (type === 'insert') {
      if (homeData.find()) {
        // Checks if data exists, drops if exists
        client.db('carebnb').dropDatabase((dropErr) => {
          if (dropErr) throw dropErr;
        });
      }
      homeData.insert(data, (insertErr) => {
        // insert mock data
        if (insertErr) throw insertErr;
        client.close(() => {
          console.log('Seed data successfully added');
          process.exit(0);
        });
      });
    }
  });
};


module.exports = connect;
