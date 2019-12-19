 import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'
import {Navbar} from 'react-bootstrap/Navbar'
import Accordion from 'react-bootstrap/Accordion'
import {Card} from 'react-bootstrap'
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
import Button from '@material-ui/core/Button';
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
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Fillter_us from './offer_add.js'
var bcrypt = require('bcryptjs');
var Snow = require('react-snow-effect');
var uniqid = require('uniqid');




class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state={
      alldata:null,
      email:'',
      log_in_resp:null,
      cur_pass:null,
      enterd_pass:null,
        loged_as:null,
        logout:null,
        navelem:null,
        show:'show',
        logout_button:'hide',
        loc_info:null,
        city:null,
        country:null,
        country_calling_code:null,
        country_name:null,
        currency:null,
        ip:null,
        languages:null,
        region:null,
        timezone:null,
        flag:null,
        us_image_offer:<img src='https://cdn3.vectorstock.com/i/1000x1000/23/02/free-shipping-icon-delivery-pointer-vector-24492302.jpg'/>,
        auth:null


    }

  }




  componentDidMount() {

    const {alldata}=this.state
    const current_user_name = localStorage.getItem('username')
    const setnavelem = localStorage.getItem('nav1')
    console.log(current_user_name)
    console.log(this.state.logout_button);
    fetch('http://localhost:5000/database')
    .then(res => res.json())
    .then(data => this.setState({
      alldata:data.posts,
      loged_as:current_user_name,
      navelem:setnavelem,
      token:null
    }))
    if (current_user_name != undefined){
      this.setState({
        show:'hide',
        logout_button:'button_no_style'
      })
      this.data_col()

    }else{
      this.setState({
        show:'show'
      })
    }
    ipapi.location(this.callback.bind(this))
    this.flagss.bind(this)
    this.add_token = this.add_token.bind(this)


  }


  token_db(x,loginas){

    (async () => {
  const rawResponse = await fetch(`http://localhost:5000/user/message/${localStorage.getItem('username')}`, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({token:x})
  });
  const content = await rawResponse.json();

  console.log(content);
  console.log(this.state.cu)
  console.log(this.state.change_to);
})();
  }

  flagss(){
    (this.state.country != undefined )? this.setState({
      flag:'moes'
    }):console.log('hummm')
  }


  data_col(){
    const {city,country,country_calling_code,country_name,currency,ip,languages,region,timezone} = this.state;
    console.log(city,country,country_calling_code,country_name,currency,ip,languages,region,timezone);
  }


  callback(loc){
      this.setState({loc_info:[loc]});
      (this.state.loc_info != null ) ? this.state.loc_info.map(x=>{








    const Selected_Contry = 'helllloooooooooo'

        this.setState({
          city:x.city,
          country:x.country,
          country_calling_code:x.country_calling_code,
          country_name:x.country_name,
          currency:x.currency,
          ip:x.ip,
          languages:x.languages,
          region:x.region,
          timezone:x.timezone,



        })
      }):console.log('loading')
  };



  logOutHandler(){
    const l = localStorage.Storage
    console.log(l)
    localStorage.clear();
    window.location.reload();
  }

  loginhandler(){
    const val = this.refs.username.value
    const val_password = this.refs.password.value
    this.setState({
      email:val,
      enterd_pass:val_password
    })
    console.log(this.state.email);
    console.log(val_password);


  }

  async add_token(){
    const keys = uniqid()
    var hash = await bcrypt.hashSync(keys, 10);
    this.setState({'auth':hash})
  }




  loginhandler_password(){
    const val_password = this.refs.password.value
    this.setState({
      enterd_pass:val_password
    })

  }

  login(){
    this.state.alldata.map(x=>{
      const c =  bcrypt.compareSync(this.state.enterd_pass,x.password);
      console.log(c,'match')


      if (this.state.email == x.email && c == true){
        localStorage.setItem('username',x.username)
        this.add_token()



        if(this.state.auth != null ){
          this.token_db(this.state.auth,x.username)
          localStorage.setItem('token',this.state.auth)
          localStorage.setItem('email',x.email)
          localStorage.setItem('nav1','DashBorad')

          this.setState({
            logout_button:'button_no_style'
          })


        }else{
          console.log('loading')
        }


      }else{
        console.log('not found');

      }


    })
  }






  render() {
    const {alldata,loged_as,logout,navelem,show,logout_button} = this.state

    var us =
    <>
    <Snow />
    <Carousel>

    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1510658018161-abde712032db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        alt="First slide"
        width='800'
        height='800'
      />
      <Carousel.Caption>
        <h3>Inspierd By You</h3>
        <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1481223014211-199b3e8f0002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
        alt="Third slide"
        width='800'
        height='800'
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://images.unsplash.com/photo-1481481525014-91e77115eace?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1876&q=80"
        alt="Third slide"
        width='800'
        height='800'
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
</>

  var sa = <Carousel>

  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://firebasestorage.googleapis.com/v0/b/projec3-75671.appspot.com/o/prodimg%2F28354262-c2a6-4666-801d-0cfbd1d410ce.jpeg?alt=media&token=c5ee2c6c-8dea-4be6-9956-0af83563e001"
      alt="First slide"
      width='800'
      height='800'
    />
    <Carousel.Caption>
      <h3>Inspierd By You</h3>
      <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://firebasestorage.googleapis.com/v0/b/projec3-75671.appspot.com/o/prodimg%2F35d51255-c090-4199-8891-7617e7349c76.jpeg?alt=media&token=ed238e13-dad4-4cc5-9d0a-055d6a5348e8"
      alt="Third slide"
      width='800'
      height='800'
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://firebasestorage.googleapis.com/v0/b/projec3-75671.appspot.com/o/prodimg%2Fphoto-1542291026-7eec264c27ff.jpeg?alt=media&token=74ce74b3-1522-4857-873e-2ae5979c855b"
      alt="Third slide"
      width='800'
      height='800'
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <h6>Nulla vitae elit libero, a pharetra augue mollis interdum.</h6>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    let free_shiping = ''
    var promot_by_Country = us






    return (
      <>


      <div className='text-flicker-in-glow'/>
        <div className="menu-toggle" id="hamburger">
            <i className="fas fa-bars"></i>
        </div>
        <div className="overlay"></div>

        <div className="container">
            <nav>

                <h1 class="brand"><a href="index.html">Designer<span>H</span>ub  <img src={`https://www.countryflags.io/${this.state.country}/flat/64.png`} width='25px'/> {(this.state.country_name == 'United States' && free_shiping != null) ? free_shiping=<img src='http://nileco.com/wp-content/uploads/2014/06/free-shipping.png' width='80px'/>:console.log('loading')}  </a></h1>

                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="/dashborad/charts">{navelem}</a></li>
                    <li><a href="/dashborad">{loged_as}</a></li>
                    <li><a href="#"><button className={logout_button} onClick={this.logOutHandler}>logout</button></a></li>
                </ul>
                <div style={{'margin':'10px' }}>
                <SerachBar/>
                </div>


            </nav>




        </div>
        <Divider />


      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="mid">
        <Typography component="div"/>
      <Paper>
  <Typography variant="h5" component="h3">


      <div className='DarkMode'>

      </div>
      <Paper>
        {(this.state.country_name == 'United States') ? <Fillter_us/>:null}

  <Typography variant="h7" component="h4">
    <div style={{padding: '10px'}}>


      {(this.state.country_name == 'United States') ? promot_by_Country=us:promot_by_Country=sa}


      {promot_by_Country[0]}


  </div>
    <Divider />
    <Accordion defaultActiveKey="0" className={show} style={{width: "100%"}}>
  <Card style={{width: "100%" ,margin: "0 auto"}}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="0">
        Regester
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="0">

      <Card.Body>
        <form className="loginform"  action="http://localhost:5000/home/login" method="post">
        <div className={"v".root}>
             <Grid container spacing={3}>
               <Grid item xs={12}>
                 user name
                 <Paper ><div><input style={{width: "100%",borderRadius: '3px'}}type="text" name="username"/></div></Paper>
               </Grid>
               <Grid item xs={12}>
                 password
                 <Paper ><input style={{width: "100%",borderRadius: '3px'}} type="password" name="password"/></Paper>
               </Grid>
               <Grid item xs={12}>
                 Email
                 <Paper ><input style={{width: "100%",borderRadius: '3px'}}type="text" name="email"/></Paper>
               </Grid>
               <Grid item xs={12}>
                 phone
                 <Paper><input style={{width: "100%",borderRadius: '3px'}} type="Number" name="phone" /></Paper>
               </Grid>
             </Grid>
           </div>
           <input type="hidden" name="ip" value={this.state.ip}/>
           <input type="hidden" name="city" value={this.state.city}/>
           <input type="hidden" name="country" value={this.state.country}/>
           <input type="hidden" name="country_calling_code" value={this.state.country_calling_code}/>
           <input type="hidden" name="country_name" value={this.state.country_name}/>
           <input type="hidden" name="currency" value={this.state.currency}/>
           <input type="hidden" name="languages" value={this.state.languages}/>
           <input type="hidden" name="region" value={this.state.region}/>
           <input type="hidden" name="timezone" value={this.state.timezone}/>
           <div><input style={{width: "100%",borderRadius: '3px'}} type="submit" value="Submit"/></div>
           </form>










</Card.Body>
    </Accordion.Collapse>
  </Card>
  <Card style={{width: "100%" ,margin: "0 auto"}}>
    <Card.Header>
      <Accordion.Toggle as={Button} variant="link" eventKey="1">
        Login
      </Accordion.Toggle>
    </Card.Header>
    <Accordion.Collapse eventKey="1">
      <Card.Body>
        <Grid container spacing={3}>
          Email
          <Grid item xs={12}>
            <Paper ><div><input style={{width: "100%",borderRadius: '3px'}}  name='username' ref='username' onChange={this.loginhandler.bind(this)}/></div></Paper>
          </Grid>
          Password
          <Grid item xs={12}>
            <Paper ><div><input style={{width: "100%",borderRadius: '3px'}} name='password' ref='password' onChange={this.loginhandler_password.bind(this)}/></div></Paper>
          </Grid>



        </Grid>


      <button onClick={this.login.bind(this)}>login</button>
      {console.log(this.state.token)}




      </Card.Body>
    </Accordion.Collapse>
  </Card>

</Accordion>

  <Fillter/>

<Divider />

</Typography>


</Paper>




<Shop/>
 <Divider />
<ShopCards/>
<Divider />





</Typography>





</Paper>
</Container>
</React.Fragment>
 <Divider />



















      </>
    );
  }

}

export default HomePage;
