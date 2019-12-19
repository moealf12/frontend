import React, { Component } from 'react';
import {Navbar} from 'react-bootstrap/Navbar'
import Accordion from 'react-bootstrap/Accordion'
import {Card,Button,Row,Container,Col} from 'react-bootstrap'
import './main.css'
import './anm.css'
import SweetAlert from 'sweetalert2-react';
import Swal from 'sweetalert2/dist/sweetalert2.js'

import Grid from '@material-ui/core/Grid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';


class CartItems extends Component {
  constructor(props){
    super(props);
    this.state={
      show_page:'show',
      cu:null,
      api_res:null,
      total:null,
      step_one:'show',
      step_one_button:'Check Out ',
      step_tow:'hide',
      step_tow_price:'show',
      bshow:'show'



    }

  }







  componentDidMount() {
    const l = localStorage
    this.setState({
      cu:l.email
    })
    fetch(`http://localhost:5000/login/${l.email}`)
    .then(res => res.json())
    .then(data => this.setState({
      api_res:data[0]
    }))


  }



  out_check(){
    Swal.fire(
  'Good job!',
  'You clicked the button!',
  'success'
)

window.location.replace("http://localhost:3000/");

  }

  make_inv(q){
    console.log('oki')

  }

  step_tow(){
    this.setState({
      "step_one":"hide",
      "step_one_button":"next",
      "step_tow":"show",
      "step_tow_price":"hide",
      "bshow":"hide"
    })
  }

  render() {
    const {show_page,api_res}=this.state
    const lfade = <><div className="loading">
    	<div className="loading-text">
    		<span className="loading-text-words">L</span>
    		<span className="loading-text-words">O</span>
    		<span className="loading-text-words">A</span>
    		<span className="loading-text-words">D</span>
    		<span className="loading-text-words">I</span>
    		<span className="loading-text-words">N</span>
    		<span className="loading-text-words">G</span>
    	</div>
    </div>

    </>
    const Loa =
    <>
    <svg width="200" height="200" viewBox="0 0 100 100">
  <polyline class="line-cornered stroke-still" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
  <polyline class="line-cornered stroke-still" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline>
  <div>{lfade}</div>
  <polyline class="line-cornered stroke-animation" points="0,0 100,0 100,100" stroke-width="10" fill="none"></polyline>
  <polyline class="line-cornered stroke-animation" points="0,0 0,100 100,100" stroke-width="10" fill="none"></polyline>
  </svg>
  </>
  var priceSum=[]
  var q = null
  var total_cart = null




    return (

      <>





      <div className={show_page}>
      <div className="menu-toggle" id="hamburger">
          <i className="fas fa-bars"></i>
      </div>

      <div className="overlay"></div>

      <div className="container">
          <nav>
              <h1 className="brand"><a href="/">Designer<span>H</span>up</a></h1>

              <ul>
                  <li><a href="/">Home</a></li>

              </ul>
          </nav>


          {
            (api_res == undefined || api_res.length < 1) ? Loa:api_res.cart.map(x=>
              <div className={this.state.step_one}>

              <Container maxWidth="sm">
       <Typography component="div" />

              <Paper className={""}>
                <Typography variant="h2" component="h2">


              <div>
              <List className={"".root}>

              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="Travis Howard" src={x.itemimg} />
                </ListItemAvatar>
                <ListItemText
                  primary={x.itemname}
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={"".inline}
                        color="textPrimary"
                      >
                        {x.itemname}
                      </Typography>
                      {x.itemprice}
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />

            </List>
          </div>
        </Typography>
        <Typography component="p">

        </Typography>
      </Paper>
      </Container>
    </div>

          )

          }





        {

            (api_res == undefined || api_res.length < 1) ? Loa:api_res.cart.map(x=>

              priceSum.push(x.itemprice)


          )

        }
        {
          (priceSum.length < 1 ) ? console.log('w8'):priceSum.map(x=>{
            total_cart = Number(x)*priceSum.length

          })

        }
      </div>
      </div>

      <div className={this.state.step_tow}>
        <Container>
          <Container>

            <Paper>
              <div style={{textAlign: 'center'}}><h1>Payment Information</h1></div>
              <div className={"".root}>

       <Grid item xs={12}>
         <Paper className={"".paper}>

           <Typography variant="h6" component="h4">
             <Grid container spacing={3}>
         <Grid item xs={12}>
           <Paper className={"n".paper}>
             <Container>
             <Grid container spacing={3}>
        <Grid item xs={12}>
          Name in Card
          <Paper className={"n".paper}>
            <input style={{width: "100%","border-radius":"2px"}}/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          Card Number
          <Paper className={"n".paper}>
            <input style={{width: "100%","border-radius":"2px"}}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          Expiration Date
          <Paper className={"n".paper}>
            <input type='date' style={{width: "100%","border-radius":"2px"}}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          CCV
          <Paper className={"n".paper}>
            <input style={{width: "100%","border-radius":"2px"}}/>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={"n".paper}><button onClick={this.out_check} style={{width: '100%'}}>Send</button></Paper>
        </Grid>

      </Grid>
    </Container>
           </Paper>
         </Grid>
       </Grid>
           </Typography>
         </Paper>

       </Grid>

   </div>
          </Paper>

        </Container>
      </Container>
      </div>

      <Container>
        <Container>
        <Paper><div className={this.state.step_tow_price}><h1> Total Price : {total_cart}</h1></div></Paper>
      </Container>
        <Paper>
          <div style={{color: 'red' ,'float': 'right'}}>
            <Container>
            <div className={this.state.bshow}><button onClick={() => {this.step_tow()}}><h4>{this.state.step_one_button}</h4></button></div>
          </Container>
        </div>
        </Paper>
      </Container>




      </>

    );
  }

}

export default CartItems;
