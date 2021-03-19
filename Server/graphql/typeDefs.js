const { gql } = require("apollo-server");

module.exports = gql`
  type User {
    id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    """
    "
    password: String
    """
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

  type Query {
    getUsers: User
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    confirmEmail(token: String!): Boolean!
    recoverPassword(email: String!): User!
    resetPassword(resetInput: ResetInput): User!
  }
`;
