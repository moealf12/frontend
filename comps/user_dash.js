import React, { Component } from 'react';
import uniqid from 'uniqid'
import {Card,Button,CardGroup,Image,Form} from 'react-bootstrap'
import {storage} from './firebase'
import CartItems from './cart'
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Swal from 'sweetalert2'
import Auth from './auth.js'

var bcrypt = require('bcryptjs');

class UserDash extends Component {
  constructor(props){
    super(props);
    this.state={
      ac:false,
      cu:null,
      page_load:null,
      change_to:null,
      item_name:null,
      item_price:null,
      poster_email:null,
      uploded_img:null,
      img_url:null,
      pdata:null,
      selected_cat:null,
      item_dsic:null,
      add_item_disc:null,
      res:null


    }

    this.setElectronic = this.setElectronic.bind(this)
    this.setHome = this.setHome.bind(this)
    this.setHandB = this.setHandB.bind(this)
    this.setMandT = this.setMandT.bind(this)
    this.FileSelectedHandler = this.FileSelectedHandler.bind(this)
    this.fileUploadHandler = this.fileUploadHandler.bind(this)
    this.path = this.path.bind(this)


  }




  change_name_handler(){
    const val = this.refs.username.value
    console.log(this.state.cu)
    this.setState({
      change_to:val
    })
    console.log(this.state.change_to)
  }


  add_item_name(){
    const val = this.refs.itemname.value

    console.log(this.state.item_name)

    this.setState({
      item_name:val
    })
}

  add_item_price(){
    const val = this.refs.itemprice.value



    this.setState({
      item_price:val
    })
    console.log(this.state.item_price);
  }




  add_item_disc(){
    const val = this.refs.add_item_disc.value
    this.setState({
      add_item_disc:val
    })
    console.log(this.state.add_item_disc);
  }


  change_name_handler_button(){

    if (this.state.change_to == undefined){
      console.log('name cant be empty')
    }else{
      (async () => {
    const rawResponse = await fetch(`http://localhost:5000/user/${this.state.cu}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username:this.state.change_to})
    });
    const content = await rawResponse.json();

    console.log(content);
    console.log(this.state.cu)
    console.log(this.state.change_to);
  })();
    }
  }

  FileSelectedHandler = event => {
    if(event.target.files[0]){
      const img = event.target.files[0];
      this.setState({
        uploded_img:img
      })




    }



  }


  fileUploadHandler(){
   const {uploded_img} = this.state
   console.log(uploded_img)
   const UploadTask = storage.ref(`prodimg/${uploded_img.name}`).put(uploded_img)
    UploadTask.on('state_changed',
   (snapshot)=>{

   },
   (error)=>{
     console.log(error);

   },
 ()=>{
   storage.ref('prodimg').child(uploded_img.name).getDownloadURL().then(url=>{

    this.setState({
      img_url:url
    })
   })

 })
 }

  add_item_button_handler(){
    console.log(this.state.item_name)
    console.log(this.state.item_price)
    console.log(this.state.cu)

    if (this.state.img_url == undefined || this.state.item_price == undefined){
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Missing Information!',
  footer: '<a href>Why do I have this issue?</a>'
})
    }else{
      (async () => {
    const rawResponse = await fetch(`http://localhost:5000/user/add/${this.state.cu}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({instore:{"itemname":this.state.item_name,"itemprice":this.state.item_price,"postedby":this.state.cu,"posteremail":this.state.poster_email,"itemimg":this.state.img_url,"item_views":1,"id":uniqid(),"selected_cat":this.state.selected_cat,"item_dsic":this.state.add_item_disc}})
    });
    const content = await rawResponse.json();

    console.log(content);

  })();
}

  }




  componentDidMount() {



    const l = localStorage
    console.log(l);
    var current_name = l.getItem('username')
    var current_email = l.getItem('email')
    var auth = l.getItem('token')
    if (auth == undefined ){
      this.setState({
        page_load:'hide'
      })
    }

    console.log(current_name);

    this.setState({
      cu:current_name,
      poster_email:current_email
    })






  }

  path(){
    console.log(this.state.img_url)
  }



  isIn(){
    var holder = []
    fetch(`http://localhost:5000/login/${this.state.poster_email}`)
    .then(res=>res.json())
    .then(data=>holder.push(data))



  }


setElectronic(){
  console.log('electronics')
  this.setState({'selected_cat':'electronics'})
}


setHome(){
  console.log('home')
  this.setState({'selected_cat':'home'})

}
setHandB(){
  console.log('Health & Beaty')
  this.setState({"selected_cat":'Health & Beaty'})

}
setMandT(){
  console.log('Mobile & tablet')
  this.setState({'selected_cat':'Mobile & tablet'})

}

dev_log_test(){
  console.log(this.state.selected_cat)
}




  logimgpath(){
    console.log(this.state.uploded_img)
    console.log(this.state.img_url)
  }



  render() {
    const {cu,page_load,isIn} = this.state
    var holder = []

    return (

      <>
      <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div"/>
      {this.isIn()}
      <div className={page_load}>
      <div className="menu-toggle" id="hamburger">
          <i className="fas fa-bars"></i>
      </div>
      <div className="overlay"></div>

      <div className="container">
          <nav>
              <h1 class="brand"><a href="/">Designer<span>H</span>up</a></h1>

              <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/">{cu}</a></li>
                  <li><a href="/dashborad/cart">perchescs</a></li>
                  <li><a href="/dashborad/message">Message</a></li>
              </ul>
          </nav>


      </div>
      <Box color="text.primary">
        <div className={'c'.root}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          item name
          <Paper className={'c'.paper}>
          <input style={{width: '100%','border-radius':'3px'}} name='itemname' ref='itemname' onChange={this.add_item_name.bind(this)}/></Paper>
        </Grid>
        <Grid item xs={6}>
          item price
          <Paper className={'c'.paper}><input style={{width: '100%','border-radius':'3px'}} name='itemprice' ref='itemprice' onChange={this.add_item_price.bind(this)}/></Paper>

        </Grid>
        <Grid item xs={6}>
          item Discraption
          <Paper className={'c'.paper}><input style={{width: '100%','border-radius':'3px'}} name='add_item_disc' ref='add_item_disc' onChange={this.add_item_disc.bind(this)}/></Paper>

        </Grid>

        <Grid item xs={6}>
          <h6>Upload Image</h6>
          <Paper className={'c'.paper}><input style={{width: '100%','border-radius':'3px'}} type="file" onChange={this.FileSelectedHandler}/></Paper>
        </Grid>
        <Grid item xs={12}>
          catgory
          <Paper component={'h5'}>
            <button onClick={()=>{this.setElectronic()}}>Electronic's</button>
            <button onClick={()=>{this.setHome()}}>Home</button>
            <button onClick={()=>{this.setHandB()}} >Health & Beauty</button>
            <button onClick={()=>{this.setMandT()}} >Mobiles & Tablets</button>
            <button onClick={()=>{this.setElectronic()}}>Electronic's</button>
            <button onClick={()=>{this.setHome()}}>Home</button>
            <button onClick={()=>{this.setHandB()}} >Health & Beauty</button>
            <button onClick={()=>{this.setMandT()}} >Mobiles & Tablets</button>
            <button onClick={()=>{this.setElectronic()}}>Electronic's</button>
            <button onClick={()=>{this.setHome()}}>Home</button>
            <button onClick={()=>{this.setHandB()}} >Health & Beauty</button>
            <button onClick={()=>{this.setMandT()}} >Mobiles & Tablets</button>
            <button onClick={()=>{this.setHandB()}} >Home</button>


        </Paper>
        </Grid>
        <Grid item xs={3}>


          <Paper className={'c'.paper}><button style={{width: '100%'}} onClick={this.change_name_handler_button.bind(this)}>Save</button></Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={'c'.paper}><div><button style={{width: '100%'}} onClick={this.fileUploadHandler} name='imgLink'>Upload</button></div></Paper>
        </Grid>


        <Grid item xs={6}>
          <Paper className={'c'.paper}><div><button style={{width: "100%"}} onClick={this.add_item_button_handler.bind(this)}>SubItem</button></div></Paper>
        </Grid>






      </Grid>
    </div>











      </Box>
    </div>
  </Container>
</React.Fragment>




      </>
    );
  }

}

export default UserDash;
