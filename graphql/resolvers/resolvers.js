// graphql/resolvers.js
const fieldResolver=require("./field")
const userResolver=require("./user")
const groupResolver=require("./group")

const rootResolver={
  ...fieldResolver,
  ...userResolver,
  ...groupResolver
  
}

module.exports=rootResolver;