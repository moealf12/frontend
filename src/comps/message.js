import React, { Component } from 'react';
import {Card,Accordion} from 'react-bootstrap'
import ShowMessages from './show_messages'
import LongTextSnackbar from './message2'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import AlignItemsList from './message2.js'
import TemporaryDrawer from './messagenav'





import Anm from './anm'
import Fillter from './shop-filter'
import {BrowserRouter as Router , Switch,Route} from 'react-router-dom'
import Shop from './shop'
import Fot from './foter.js'
import ShopCards from './ShopCards'
import About from './about'
import './main.css'
import ipapi  from 'ipapi.co'
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { Doughnut,Bar,Linke,Pie } from 'react-chartjs-2';
import ItemViewPage from './item_view_page'
import CssBaseline from '@material-ui/core/CssBaseline';
import Foot from './foter'
import Container from '@material-ui/core/Container';
import SerachBar from './searchbar'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fillter_us from './offer_add.js'
class Message extends Component {
  constructor(props){
    super(props);
    this.state={
      cu:localStorage['username'],
      send_to:null,
      messageBody:null,
      data:Date.now(),
      api_res:null,
      cu_email:localStorage['email'],
      show_inbox:'show',
      new_message_form:'hide'


    }

  }




componentDidMount() {
  fetch('http://localhost:5000/database')
  .then(res=>res.json())
  .then(data=>this.setState({
    api_res:data.posts

  }))

}





  send_to(){
    const username = this.refs.username.value
    console.log(username)
    this.setState({
      send_to:username
    })



  }


  message_body(){
    const message_body = this.refs.message.value
    console.log(message_body)
    this.setState({
      messageBody:message_body
    })

  }


  Send_message_handler(){
    const {cu , send_to,messageBody,data} = this.state
    console.log(`New Message From ${cu} To ${send_to} Message:${messageBody} Date:${data}`);
    (async () => {
    const rawResponse = await fetch(`http://localhost:5000/user/messages/${send_to}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({messages:{"from":cu,"to":send_to,"MessageBody":messageBody,"Date":data}})
    });
    const content = await rawResponse.json();

    console.log(content);

  })();
  }



  render() {
    const {cu,api_res,cu_email} = this.state
    const {show_state} = this.props
    return (
      <>



      <div className="menu-toggle" id="hamburger">
          <i className="fas fa-bars"></i>
      </div>
      <div className="overlay"></div>

      <div className="container">
          <nav>
              <h1 class="brand"><a href="">Designer<span>H</span>up</a></h1>


              <ul>
                  <li><a href="/">Home</a></li>
                  <li><a  onClick={()=>{this.setState({'show_inbox':'hide','new_message_form':'show'})}}>New</a></li>
                  <li><a  onClick={()=>{this.setState({show_inbox:'show','new_message_form':'hide'})}}>inBox</a></li>



              </ul>
          </nav>

      </div>
      <Container style={{height:'100%'}}>
        <Paper>

      <div className={this.state.new_message_form}>
        <Grid container spacing={3}>
     <Grid item xs={12}>

       <Paper className={"n".paper}>

           Recever : <input style={{'width':'100%','border radius':'3px'}} name='username' ref='username' onChange={this.send_to.bind(this)}/>
       </Paper>
     </Grid>
     <Grid item xs={6}>
       <div>Message</div>
       <Paper className={"n".paper}>

         <input style={{'width':'100%','border radius':'3px'}} name='message' ref='message' onChange={this.message_body.bind(this)}/>
       </Paper>
     </Grid>

   </Grid>


      <div>
        <div style={{alignItems: 'center'}}><button onClick={this.Send_message_handler.bind(this)}>Send</button></div>
        </div>
      </div>
    </Paper>
    </Container>


        {
          (api_res == undefined ) ? console.log('w8'):api_res.map(x=>
            (x.email == cu_email ) ? x.messages.map(x=>{
              return <Container style={{height:'100%'}}><Paper><div className={this.state.show_inbox}><div style={{width: '100%' ,margin: 'auto 0'}}><ShowMessages from={x.from} messagebody={x.MessageBody} /></div></div></Paper></Container>
              console.log(x)

            }):console.log('k')
          )
        }

      <TemporaryDrawer/>
      {console.log(show_state)}

      </>
    );
  }

}

export default Message;
