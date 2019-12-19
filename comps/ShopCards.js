import React, { Component } from 'react';
import {CardGroup,Image,Row,Col,Container} from 'react-bootstrap'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import ItemViewPage from './item_view_page'
var uniqid = require('uniqid');

class ShopCards extends Component {

  state={
    data:[],
    cu:null,
    resp:null

  }


  componentDidMount() {
    fetch('http://localhost:5000/database')
    .then(res=>res.json())
    .then(res => this.setState({data:res.posts}))

    const l = localStorage
    console.log(l)
    this.setState({
      cu:l.username
    })


  }





  item_views(q){
    localStorage.setItem('view_item',`${q.itemname}`)
    localStorage.setItem('postedby',`${q.postedby}`)

    var currentdate = new Date();

    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/"
                + currentdate.getFullYear() + " "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

    (async () => {
      const rawResponse = await fetch(`http://localhost:5000/user/add/views/${q.postedby}`, {
        method: 'PUT',
        headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"Views":{"postedby":q.postedby,"itemname":q.itemname,"itemprice":q.itemprice,"itemimg":q.itemimg,"Date":datetime.split(' '),"item_views":q.item_views+1,"viewd_by":this.state.cu,"id":uniqid()}})
  });
  const content = await rawResponse.json();

  console.log(content);

})();

  }



  show_item_info(q){


    if (1 == undefined){
      console.log('Loading omg')
    }else{
      (async () => {
    const rawResponse = await fetch(`http://localhost:5000/user/addcart/${this.state.cu}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cart:{"itemname":q.itemname,"itemprice":q.itemprice,"itemimg":q.itemimg,"item_views":+1}})
    });
    const content = await rawResponse.json();

    console.log(content);

  })();
}

  }

  render(){
    const {data} = this.state
    const {name,price} = this.props
    const postedby = []
    return (


      <>


      {
        data.map(x=>{
          var all_store_data = x.instore
          all_store_data.map(x=>{
            postedby.push(x)
          })
        })
      }
      <Paper>
     <Typography variant="h5" component="h3">

      <Row style={{margin:0}}>
      {
        postedby.map(x=>
          <Card style={{maxWidth: 345,width: '260px' ,height:'50%',margin: 5}}>
           <CardActionArea>
             <CardMedia
               component="img"
               image={x.itemimg} width="260px" height="250px"
               title="Contemplative Reptile"
             />
             <CardContent>
               <h6>{x.selected_cat}</h6>
               <Typography gutterBottom variant="h5" component="h2">
                 {x.itemname}

               </Typography>
               <Typography variant="body2" color="textSecondary" component="p">
                 Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                 across all continents except Antarctica
               </Typography>
               Posted by : {x.postedby}


               <div>Price : {x.itemprice} $</div>
             </CardContent>
           </CardActionArea>
           <CardActions>


          <div><button onClick={()=>this.show_item_info(x)} style={{width: '100%'}}>Add to Cart </button></div>
          <div><a href='http://localhost:3000/shop/item'><button onClick={()=>this.item_views(x)} style={{width: '100%'}}>View</button></a></div>

           </CardActions>
         </Card>

          // <div className="my-1 mx-auto p-relative bg-white shadow-1 blue-hover" style={{width:'260px',overflow: 'hidden border-radius:10px'}}>
          //         <img src={x.itemimg} alt="Man with backpack" width="260px" height="250px"/>
          //             <div className="d-block w-full">
          //
          //   <div className="px-2 py-2">
          //     <h6 className="mb-0 small font-weight-medium text-uppercase mb-1 text-muted lts-2px">
          //       Elctronecs
          //     </h6>
          //
          //     <h1 className="ff-serif font-weight-normal text-black card-heading mt-0 mb-1" style={{'line-height': '1'}}>
          //       {x.itemname}
          //     </h1>
          //
          //     <h6 className="mb-1">
          //       Summer is coming to a close just around the corner. But it's not too late to squeeze in another weekend trip &hellip;
          //     </h6>
          //
          //   </div>
          //
          //   <a href="#0" className="text-uppercase d-inline-block font-weight-medium lts-2px ml-2 mb-2 text-center styled-link">
          //     Read More
          //   </a>
          //
          //
          // <div className="w-full bg-white py-1 px-2 clearfix" style={{'border-top': "1px solid rgba(0,0,0,0.12)"}}>
          //         <span className="float-left">
          //
          //             <span className="styled-link">Price : {x.itemprice}</span>
          //         </span>
          //
          //         <span className="float-right">
          //             posted by <a href="https://kalyanlahkar.github.io" className="styled-link">{x.postedby}</a>
          //         </span>
          //
          //
          //       </div>
          //
          //
          //       <div>
          //
          //       <fieldset class="rating">
          //       <input type="radio" id="star5" name="rating" value="5" /><label class = "full" for="star5" title="Awesome - 5 stars"></label>
          //       <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
          //       <input type="radio" id="star4" name="rating" value="4" /><label class = "full" for="star4" title="Pretty good - 4 stars"></label>
          //       <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
          //       <input type="radio" id="star3" name="rating" value="3" /><label class = "full" for="star3" title="Meh - 3 stars"></label>
          //       <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
          //       <input type="radio" id="star2" name="rating" value="2" /><label class = "full" for="star2" title="Kinda bad - 2 stars"></label>
          //       <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
          //       <input type="radio" id="star1" name="rating" value="1" /><label class = "full" for="star1" title="Sucks big time - 1 star"></label>
          //       <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
          //
          //   </fieldset>
          // </div>
          //       <div><button onClick={()=>this.show_item_info(x)} style={{width: '100%'}}>Add to Cart </button></div>
          //       <div><button onClick={()=>this.item_views(x)} style={{width: '100%'}}>View</button></div>
          //     </div>
          //   </div>


        )
      }
</Row>

</Typography>
</Paper>
      {

      }


      </>
    );
  }

}

export default ShopCards;
