// graphql/resolvers.js
const fieldResolver=require("./field")
const userResolver=require("./user")
const groupResolver=require("./group")
const sportResolver=require("./sport")

const rootResolver={
  ...fieldResolver,
  ...userResolver,
  ...groupResolver,
  ...sportResolver
  
}

module.exports=rootResolver;