import React, { Component } from 'react';
import ShopCards from './ShopCards'
import {Card,Button} from 'react-bootstrap'

class Shop extends Component {
  state={
    data:[],
    items:null
  }



  componentDidMount() {
    fetch('http://localhost:5000/database')
    .then(res=>res.json())
    .then(res => this.setState({data:res.posts}))
  }



  render() {
    const {data,items} = this.state
    return (
      <>


      </>
    );
  }

}

export default Shop;
