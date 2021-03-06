
import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $name: String!
    $email: String!
  ) {
    createUser(
      data:{
        name:$name,
        email:$email,
      }){
      id
    }
  }
  `;

  export const CREATE_POST_MUTATION = gql`
  mutation createPost(
    $title: String!
    $body: String!
    $image: Upload!
    $author: ID!
  ) {
    createPost(
      data:{
        title:$title,
        body:$body,
        image: $image
        author:{
          connect:{
            id:$author
          }
        }
      }){
        image{
          path
          publicUrl
        }
    }
  }
  `;
  export const UPDATE_POST_MUTATION = gql`
    mutation updatePost(
      $id: ID!
      $title: String!
      $body: String!
    ){
      updatePost(
        id:$id,
        data:{
          title:$title,
          body:$body,
        })
        {
          title
          body
        }
    }
  `;

  export const DELETE_POST_MUTATION = gql`
    mutation deletePost(
      $id: ID!
    ){
      deletePost(id:$id){
        title
      }
    }
  `;
