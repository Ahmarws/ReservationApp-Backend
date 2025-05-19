// graphql/typedefs.js

const { buildSchema } = require("graphql");

const typedefs = buildSchema(`
  type Group {
    id: ID!
    name: String!
  }
  
  input GroupInput {
    name: String!
  }
  type SubField {
    name: String!
  }
  
  type TimeRange {
    start: String!
    end: String!
  }
  
  type Field {
    id:ID!
    name: String!
    subFields:[SubField]
    timeRanges:[TimeRange]
  }
  
  input SubFieldInput {
    name: String!
  }
  input TimeRangeInput {
    
    start:String!
    end:String!
  }
  input FieldInput {
    name: String!
    subFields: [SubFieldInput]
    timeRanges: [TimeRangeInput]
  }
  
  type User {
    id: ID!
    email: String!
    name: String!
    password: String
  }
  
  input UserInput {
    email: String!
    name: String!
    password: String!
  }
  type authUser{
    userId:ID!
    token:String!
    tokenExpiration:Int!
  }
  
  type RootQuery {
    groups: [Group!]!
    users: [User!]!
    fields: [Field!]!
    login(email:String!,password: String!):authUser!
  }
  
  type RootMutation {
    createGroup(groupInput: GroupInput): Group
    UpdateGroup(id:ID!, groupInput: GroupInput): Group
    DeleteGroup(id:ID!): Boolean
    createUser(userInput: UserInput): User
    UpdateUser(id:ID!, userInput: UserInput): User
    DeleteUser(id:ID!): Boolean
    createField(fieldInput: FieldInput!): Field
    updateField(id: ID!, fieldInput: FieldInput!): Field
    deleteField(id: ID!): Boolean
  }
  
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);

module.exports = typedefs;
