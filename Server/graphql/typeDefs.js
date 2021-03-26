const { gql } = require("apollo-server");

module.exports = gql`
  type File {
    url: String!
  }

  type Query {
    uploads: [File]
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    isVerified: Boolean
    token: String
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
    addBirthday(birthday: String!): Boolean!
  }
`;
