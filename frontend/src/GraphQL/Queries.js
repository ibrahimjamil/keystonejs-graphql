import { gql } from "@apollo/client";


//Read is for queries rest is for mutation
export const LOAD_POSTS = gql`
  query {
    allPosts{
      id
      title
      body
      image{
        publicUrl
      }
      author{
        id
        name
      }
    }
  }
`;
