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
  type Sport {
    id: ID!
    name: String!
  }
  
  input SportInput {
    name: String!
  }
  type SubField {
    SubFieldname: String!
  }
  
  type TimeRange {
    availableHours: String!
  }
  
  type Field {
    id:ID!
    fieldName: String!
    subFields:[SubField]
    timeRanges:[TimeRange]
  }
  
  input SubFieldInput {
    SubFieldname: String!
  }
  input TimeRangeInput {
    
    availableHours:String!

  }
  input FieldInput {
    fieldName: String!
    subFields: [SubFieldInput]
    timeRanges: [TimeRangeInput]
  }
  
  type User {
    id: ID!
    email: String!
    name: String!
    password: String
    role:String
  }
  
  input UserInput {
    email: String!
    name: String!
    password: String!
    role:String
  }
  type authUser{
    userId:ID!
    token:String!
    tokenExpiration:Int!
  }
  
  type RootQuery {
    groups: [Group!]!
    sports: [Sport!]!
    users: [User!]!
    fields: [Field!]!
    login(email:String!,password: String!):authUser!
  }
  
  type RootMutation {
    createGroup(groupInput: GroupInput): Group
    UpdateGroup(id:ID!, groupInput: GroupInput): Group
    DeleteGroup(id:ID!): Boolean
    createSport(sportInput: SportInput): Sport
    UpdateSport(id:ID!, sportInput: SportInput): Sport
    DeleteSport(id:ID!): Boolean
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
