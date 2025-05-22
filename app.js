require('dotenv').config();

// app.js

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");

const typedefs = require("./graphql/typedefs/typedefs");
const rootResolver = require("./graphql/resolvers/resolvers");
const isauth = require("./middleware/isAuth");


const app = express();

// Connect to MongoDB
mongoose
  .connect(`mongodb://localhost:27017/Reservation-db`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin",'*');
  res.setHeader("Access-Control-Allow-Methods",'POST,GET,OPTIONS');
  res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
  if (req.method==="OPTIONS") {
    return res.sendStatus(200);
  }
  
  next();
})

app.use(isauth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: typedefs,
    rootValue: rootResolver,
    graphiql: true,
  })
);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
