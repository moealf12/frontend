import React, { Component } from 'react';

import List from '@material-ui/core/List';
import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import { amber, green } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';






class CommentsView extends Component {
  constructor(props) {
    super(props);

    this.state = {view_name:null,
                  postedby:null,
                  comments_resp:null,
                  Comment_input:'',
                  resp:null
                }
  }



  componentDidMount() {
    this.setState({
      view_name:localStorage.getItem("view_item"),
      postedby:localStorage.getItem("postedby"),
      resp_:null,

    })

    fetch(`http://localhost:5000/user/comments/${localStorage.getItem("postedby")}`)
    .then(res => res.json())
    .then(data => this.setState({
      comments_resp:data

    }))


  }



  flash(){

  }

  add_item_price(){
    const val = this.refs.itemprice.value



    this.setState({
      Comment_input:val
    })

  }

  Add_Comment(){


  var currentdate = new Date();
  var datetime =  currentdate.getDate() + "/"
                  + (currentdate.getMonth()+1)  + "/"
                  + currentdate.getFullYear() + " @ "
                  + currentdate.getHours() + ":"
                  + currentdate.getMinutes() + ":"
                  + currentdate.getSeconds();


                  (this.state.Comment_input.length == 0 || this.state.Comment_input.length == null || localStorage.length == undefined || localStorage.getItem('username') == null )? Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: ' Something Went Wrong !  ',
  footer: '<a href>Why do I have this issue?</a>'
}):(async () => {
                const rawResponse = await fetch(`http://localhost:5000/user/comment/${this.state.postedby}`, {
                  method: 'PUT',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({comments:{"itemname":this.state.view_name,"commentby":localStorage.getItem('username'),"CommentBody":this.state.Comment_input,"time":datetime}})
                });
                const content = await rawResponse.json();

                console.log(content);
                this.setState({
                  resp:<div class="alert alert-success" role="alert">
                Comment Send
              </div>
                })
                function sleep (time) {
                return new Promise((resolve) => setTimeout(resolve, time));
              }

              sleep(1500).then(() => {
                this.setState({
                  resp:null
                })
                window.location.reload();


              });



              })();

  }


show_pop(){
  return <div class="alert alert-primary" role="alert">
This is a primary alert—check it out!
</div>
}


  render() {
    var all_coms = []
    const {comments_resp,view_item} = this.state
    const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor:"red",
  },
  inline: {
    display: 'inline',
  },
}));


    return (
      <>




      {
        (comments_resp != null ) ? comments_resp.map(x=>{
          x.Comments.forEach(q=>{
            (q.itemname == localStorage.getItem("view_item")) ? all_coms.push(q):console.log('')
          })
        }):null
      }


      {
        (all_coms != null) ? all_coms.map(x=>{
          return <>
           <div>
          <Grid container spacing={3}>
          <React.Fragment>
          <CssBaseline />
          <Container fixed maxWidth="mid">
            <Typography component="div" style={{ backgroundColor: 'white', height: '1%',width: '100%', margin: 10,border:'solid 1px white' }} />

          {console.log(x)}
          {console.log(this.state.view_name,localStorage.getItem('username'),this.state.Comment_input,this.state.postedby)}

          <List className={useStyles.root}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              backgroundColor='black'
              primary={x.commentby}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={useStyles.inline}

                    color="gray"
                  >

                  </Typography>
                  <div style={{color: "black"}}><h4>{x.CommentBody}</h4></div>
                  {x.time}
                </React.Fragment>

              }
            />
          </ListItem>

        </List>
      </Container>
    </React.Fragment>

    </Grid>
  </div>

        </>
        }):console.log(null)
      }


<div className={'c'.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>


            <Paper className={'c'.root}>

  <Typography variant="h5" component="h3">

  </Typography>
  <Paper>
    {this.state.resp}

            <input style={{height: "25px",width: "100%"}}  name='itemprice' ref='itemprice' onChange={this.add_item_price.bind(this)} />
          <Button style={{width: "100%"}}  color="primary" onClick={()=>this.Add_Comment()}>
      Comment
    </Button>

          </Paper>
          <Typography component="p">

          </Typography>
        </Paper>
        </Grid>
      </Grid>


    </div>





    </>
    );
  }

}

export default CommentsView;
