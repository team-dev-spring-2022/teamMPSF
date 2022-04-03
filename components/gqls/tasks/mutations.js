import {gql} from '@apollo/client';

export const DTASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(input: {id: $id}) {
      id
    }
  }
`;

export const NTASK = gql`
  mutation createTask(
    $title: String!
    $description: String!
    $mail: String!
    $date: Date!
  ) {
    createTask(
      input: {
        title: $title
        description: $description
        mail: $mail
        date: $date
      }
    ) {
      id
    }
  }
`;

export const UTASK = gql`
  mutation updateTask(
    $id: String!
    $title: String!
    $description: String!
    $date: Date!
  ) {
    updateTask(
      input: {id: $id, title: $title, description: $description, date: $date}
    ) {
      id
    }
  }
`;
