import {gql} from '@apollo/client';

export const DTASK = gql`
mutation deleteTask($id){
  deleteTask (id: $id) {
      id
  }
}
`;

export const NTASK = gql`
  mutation createTask($title: String!, $description: String!, $mail: String!) {
    createTask(input: {title: $title, description: $description, mail: $mail}) {
      id
    }
  }
`;
