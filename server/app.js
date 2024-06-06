const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { authenticate } = require('./auth');
const schema = require('./schema/schema');

dotenv.config();

const app = express();

// Middleware to handle CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Apply the authentication middleware
app.use(authenticate);

// Set up the GraphQL endpoint
app.use('/graphql', graphqlHTTP((req) => ({
  schema,
  graphiql: true,
  context: {
    user: req.user,
  },
})));

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
