import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { CREATE_USER_MUTATION,CREATE_POST_MUTATION} from "./GraphQL/Mutations";
import { useMutation } from "@apollo/client";


const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 48,
    padding: '0 30px',
  },
});

function Form({style,doFetch}) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [author, setAuthor] = useState("")
  const [image,setFile] = useState('')
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [createPost] = useMutation(CREATE_POST_MUTATION);

  const addUser = async () => {
    const authorID = await createUser({
      variables: {
        name: name,
        email: email,
      },
    });
    setAuthor(authorID.data.createUser.id)
    setName('')
    setEmail('')
  }
  
  const addPost = async () => {
    const data = await createPost({
      variables:{
        title:title,
        body:body,
        image:image,
        author:author
      }
    })
    console.log(data)
    setTitle('')
    setBody('')
    setAuthor('')
    doFetch(true)
  }
  return (
    <div style={style}>
      <h1 style={{
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        textAlign:"center",
        color:"#FE6B8B"
      }}>
        Add User
      </h1>
      <TextField 
        style={{
          marginBottom:"10px",
          textJustify:"auto",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        label="Name" 
        variant="outlined" 
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <TextField 
        label="email"
        style={{
          marginBottom:"10px",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }} 
        variant="outlined" 
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Button
        classes={{
            root:classes.root
          }}
        style={{
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        onClick={()=>addUser()}
      >
        Add User
      </Button>

      <h1 style={{
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        textAlign:"center",
        color:"#FE6B8B"
      }}>
        Add Post
      </h1>
      <TextField 
        style={{
          marginBottom:"10px",
          textJustify:"auto",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        label="Title" 
        variant="outlined" 
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <TextField 
        label="Body"
        style={{
          marginBottom:"10px",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }} 
        variant="outlined" 
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <TextField 
        label="Author"
        style={{
          marginBottom:"10px",
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }} 
        variant="outlined" 
        value={author}
        onChange={(e) => {
          setAuthor(e.target.value);
        }}
      />
      <div  style={{
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom:"10px"
      }}>
        <input 
          name={'document'} 
          type={'file'} 
          onChange={(e) => {
              setFile(e.target.files[0])
            }}
        />
      </div>
      <Button
        classes={{
            root:classes.root
          }}
        style={{
          width:"50%",
          marginLeft:"auto",
          marginRight:"auto"
        }}
        onClick={()=>addPost()}
      >
      Add Post
      </Button>
    </div>
  );
}
export default Form;