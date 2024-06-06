const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const path = require('path');
const { typeDefs, resolvers } = require('./schema');
const db = require('./config/connection');

const schema = buildSchema(typeDefs);
const root = resolvers;

const app = express();

// GraphQL middleware
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
}));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
} 

const PORT = process.env.PORT || 3001;

// Start the server after database connection is established
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
  });
});
