import React,{useState,useEffect} from 'react'
import Tooltip from '@mui/material/Tooltip';
import { Button, Dialog, Grid } from '@material-ui/core'
import { makeStyles } from '@mui/styles';
import { useQuery } from "@apollo/client";
import {UPDATE_POST_MUTATION,DELETE_POST_MUTATION} from './GraphQL/Mutations'
import { LOAD_POSTS } from './GraphQL/Queries';
import { useMutation } from "@apollo/client";
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles({
  root: {
    "&:hover":{
      cursor:"pointer"
    }
  },
  dialog:{
    minHeight: "40vh",
    padding: 10,
  },
  button:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white !important',
    height: 48,
    padding: '0 30px',
  }
});

const List = ({style,fetching,updateFetching}) => {
    const classes = useStyles();
    const { data , refetch} = useQuery(LOAD_POSTS);
    const [updatePost] = useMutation(UPDATE_POST_MUTATION);
    const [deletePost] = useMutation(DELETE_POST_MUTATION);
    const [editModel,setEditModelOpen] = useState(false)
    const [postIndex,setPostIndex] = useState(null)
    const [alert,setAlert] = useState(false)
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
      console.log(data)
        if (data) {
          setPosts(data.allPosts);
        }
      }, [data]);
    
    useEffect(()=>{
      refetch()
      updateFetching(false)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fetching])

    const updPost = async () => {
      console.log(postIndex)
      await updatePost({
        variables: {
          id: postIndex,
          title: title,
          body: body,
        },
      });
      setTitle('')
      setBody('')
      refetch()
      setEditModelOpen(false)
    }

    const deletePst = async (id) =>{
      await deletePost({
        variables: {
          id:id,
        },
      });
      refetch()
      setAlert(true)
    }
    return (
        <div style={style}>
          <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center"
              }}
            >
              <h1 
                style={{
                  color:"#FE6B8B"
                }}>
                Read list of posts detail 
              </h1>
              {!!posts && posts.map((val,index) => {
                  return (
                    <Grid direction="row" container xs={12}>
                      <Grid item xs={10}>
                        <h4 style={{textAlign:"center",position:"relative"}}> 
                          <span 
                            style={{
                              color:"#FE6B8B"
                            }}>
                            <FiberManualRecordIcon/> &nbsp;   
                          </span> 
                            id :{val.id} title: {val.title} body:{val.body} and ref-author: {val.author.name}
                        </h4>
                      </Grid>
                      <Grid container item direction="row" xs={2}>
                            <div style={{margin:"auto 10px",display:"flex",flexDirection:"row"}}>
                              <Tooltip title="Update">
                                <div className={classes.root} onClick={()=>{
                                      setPostIndex(val.id)
                                      setEditModelOpen(true)
                                    }}>
                                    <EditOutlinedIcon/>
                                </div>
                              </Tooltip>
                              <Tooltip title="Delete">
                                <div className={classes.root} onClick={()=>deletePst(val.id)}>
                                    <DeleteOutlineOutlinedIcon/>
                                </div>
                              </Tooltip>
                            </div>
                       </Grid>
                    </Grid>
                  )
              })}
          </div>
          {!!editModel && (
            <Grid container direction={"column"} alignItems={"center"}>
              <Dialog
                  classes={{ paper: classes.dialog }}
                  open={editModel}
                  onClose={()=>setEditModelOpen(false)}
                  maxWidth={'md'}
                  fullWidth={true} 
              >
                  <h2 style={{
                    width:"50%",
                    marginLeft:"auto",
                    marginRight:"auto",
                    textAlign:"center",
                    color:"#FE6B8B"
                  }}>
                    Update Post {postIndex}
                  </h2>
                  <TextField 
                    style={{
                      marginBottom:"10px",
                      textJustify:"auto",
                      width:"50%",
                      marginLeft:"auto",
                      marginRight:"auto"
                    }}
                    label="title" 
                    variant="outlined" 
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />
                <TextField 
                    label="body"
                    style={{
                      marginBottom:"10px",
                      width:"50%",
                      marginLeft:"auto",
                      marginRight:"auto"
                    }} 
                    variant="outlined" 
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                />
                <div 
                  style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"center"
                  }}
                >
                  <Tooltip title="Close">
                    <Button
                      classes={{
                          root:classes.button
                        }}
                      style={{
                        width:"25%",
                        marginRight:"5px"
                      }}
                      onClick={()=>setEditModelOpen(false)}
                    >
                      Close
                    </Button>
                  </Tooltip>
                  <Tooltip title="Update">
                    <Button
                      classes={{
                          root:classes.button
                        }}
                      style={{
                        width:"25%",
                      }}
                      onClick={updPost}
                    >
                      Update Post
                    </Button>
                  </Tooltip>
                </div>
              </Dialog>
            </Grid>
          )}
          {!!alert && (
            <Snackbar open={alert} autoHideDuration={2000} onClose={()=>setAlert(false)}>
              <Alert severity="success" sx={{ width: '100%' }}>
                User record has been deleted
              </Alert>
            </Snackbar>
          )}
        </div>
    )
}

export default List
