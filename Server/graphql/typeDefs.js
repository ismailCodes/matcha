const { gql } = require("apollo-server");

module.exports = gql`
  type File {
    url: String!
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    token: String
    distance: Int
  }

  input RegisterInput {
    firstName: String!
    lastName: String!
    username: String!
    email: String!
    password: String!
  }

  input ResetInput {
    password: String!
    confirmPassword: String!
    resetToken: String!
  }

  enum Gender {
    Male
    Female
  }

  enum SexualPreference {
    Heterosexual
    Bisexual
    Homosexual
  }

  type Interest {
    interest: String!
  }

  input InterestInput {
    interest: String!
  }

  type Query {
    uploads: [File]
    browseUsers(minDistance: Int, maxDistance: Int): [User]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    confirmEmail(token: String!): Boolean!
    recoverPassword(email: String!): User!
    resetPassword(resetInput: ResetInput): User!
    modifyFirstName(firstName: String!): Boolean!
    modifyLastName(lastName: String!): Boolean!
    modifyEmail(email: String!): Boolean!
    addGender(gender: Gender!): Boolean!
    addSexualPreference(sexualPreference: SexualPreference!): Boolean!
    addBiography(biography: String!): Boolean!
    uploadFile(file: Upload!): File!
    addAge(age: Int!): Boolean!
    addInterrests(interests: [InterestInput]): Boolean!
    addInterrest(interest: String!): Boolean!
    removeInterrest(interest: String!): Boolean!
    forceGeolocation(string: String!): Boolean!
  }
`;
