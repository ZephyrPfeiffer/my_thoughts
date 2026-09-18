const mongoose = require('mongoose')
const dns = require("node:dns/promises");

dns.setServers(["1.1.1.1", "8.8.8.8"])

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB




// require('dotenv').config({ path: './config/.env' });
// const { MongoClient, ServerApiVersion } = require('mongodb')

// const uri = process.env.DB_STRING;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     autoSelectFamily: true,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// const connectDB = async () => {
//   try {
//     // Connect the client to the server
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     const result = await client.db('admin').command({ ping: 1 });
//     console.log(
//       'Pinged your deployment. You successfully connected to MongoDB!'
//     );
//     return result;
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// // connectDB().catch(console.dir);

// module.exports = connectDB;
