import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './comps/home'
import Shop from './comps/shop'
import {BrowserRouter as Router , Switch,Route,Redirect} from 'react-router-dom'
import DashBorad from './comps/user_dash'
import mod from './comps/mod'
import About from './comps/about'
import CartItems from './comps/cart'
import Message from './comps/message'
import UserCharts from './comps/charts'
import ItemViewPage from './comps/item_view_page'
import Fot from './comps/foter.js'
import err from './comps/er.js'


class App extends Component {
  constructor(props) {
    super(props);

    this.state ={
      uth:null,
      token_:null}


      // this.Check_token = this.Check_token.bind(this)


  }

  auth_state(dbkey,localKey){
    if (localKey == dbkey ){
      return true
    }else{
      return false

    }

  }



componentDidMount() {
  fetch(`http://localhost:5000/user/auth/token/${localStorage.getItem('username')}`)
  .then(res => res.json())
  .then(res => this.setState({
    'auth':res
  }))
}





  render() {
    const {auth} = this.state
    var user_information = []
    const user_token = []

    return (
      <>





      {
      (this.state.auth != undefined && localStorage.getItem('username') != undefined) ? this.state.auth.map(x=>{
        user_information.push(x)
      }):console.log('laoding')
      }
      {
        (user_information != undefined && user_information != null ) ? user_information.map(x=>{
          user_token.push(x.token)

        }):null


      }

      {


        console.log('pl')

      }


      <Router>
      <Switch>
      <Route path='/' exact component={HomePage}/>

      <Route path='/shop' exact component={Shop}/>
      {(this.auth_state(user_token,localStorage.token) == true  ) ? <div>

      <Route path="/dashborad" exact component={DashBorad}/>
      <Route path="/dashborad/cart" exact component={CartItems}/>
      <Route path="/dashborad/message" exact component={Message}/>
      <Route path="/dashborad/charts" exact component={UserCharts}/>
      <Route path="/shop/item" exact component={ItemViewPage}/>


    </div>:null
        }



      <Route path="/about" exact component={About}/>
      <Route path="/shop/item" exact component={ItemViewPage}/>

      </Switch>
      </Router>
      <Fot/>



      </>
    );
  }

}

export default App;
