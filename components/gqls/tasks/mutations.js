import {gql} from '@apollo/client';

export const DTASK = gql`
mutation deleteTask($id){
  deleteTask (id: $id) {
      id
  }
}
`;
