
import Header from './header'
import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import CommentsView from './comments'
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Swal from 'sweetalert2'
import Container from '@material-ui/core/Container';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';



class ItemViewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {name:null,
                  postedby:null,
                  resp_:null,
                  view_name:null,
                  item_name:null,
                  cu:null

                };
                this.show_item_info = this.show_item_info.bind(this)
  }
  componentDidMount() {
    this.setState({
      view_name:localStorage.getItem("view_item"),
      postedby:localStorage.getItem("postedby"),
      resp_:null,
      cu:localStorage.getItem('email')

    })




    fetch(`http://localhost:5000/shop/${localStorage.getItem("postedby")}`)
    .then(res => res.json())
    .then(data => this.setState({
      resp_:data
    }))





  }
  show_item_info(q){


    if (localStorage.getItem('username') == undefined){
      Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'You Must Be Logged in ',
  footer: '<a href>Why do I have this issue?</a>'
})
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

  render() {
    const item_info = []
    const item_name_rp = null
    let comments = []
    let ite_name = []
    const all_c = []
    const {name,resp_,view_name} = this.state
    return (
      <>



        {
          (resp_ != null) ? resp_.map(x=>{
            x.instore.map(x=>{
              return (x.itemname == view_name ) ? item_info.push({"itemname":x.itemname,"postedby":x.postedby,"itemimg":x.itemimg,"item_id":x.id,"itemprice":x.itemprice,"posteremail":x.posteremail,"disc":x.item_dsic}):null
            })
          }):<h1>Loading</h1>
        }

        {
        item_info.map(x=>{
          return<>
          <div className="menu-toggle" id="hamburger">
              <i className="fas fa-bars"></i>
          </div>
          <div className="overlay"></div>

          <div className="container">
              <nav>
                  <h1 class="brand"><a href="index.html">Designer<span>H</span>ub</a></h1>



                  <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="/about">About</a></li>
                      <li><a href="#">Contact</a></li>

                  </ul>

              </nav>




          </div>
          <React.Fragment>
      <CssBaseline />
      <Container fixed>
  <Box>



     <Grid container spacing={4}>
       <Grid item xs>
         <Paper style={{height: '100%',width: "100%"}}>

           <Grid container spacing={2}>
             <Grid item>

             </Grid>
             <Grid item xs={12} sm container>
               <Grid item xs container direction="column" spacing={2}>
                 <Grid item xs>

                 </Grid>
                 <ButtonBase>
                   <img width='250px' src={x.itemimg}/>
                 </ButtonBase>
                 <Grid item>
                   <Typography variant="body2" style={{ cursor: 'pointer' }}>

                   </Typography>
                 </Grid>
               </Grid>
               <Grid item>

               </Grid>
             </Grid>
           </Grid>
         </Paper>
       </Grid>
       <Divider/>
       <Grid item xs>
         <Card  style={{margin: '5px'}}className={"".card}>
               <CardContent>
                 <Typography className={"".title} color="textSecondary" gutterBottom>
                   {x.postedby}
                 </Typography>
                 <Typography variant="h5" component="h2">
                  {x.itemname}
                 </Typography>
                 <Typography className={"".pos} color="textSecondary">
                   {x.itemprice} $
                 </Typography>
                 <Typography variant="body2" component="p">
                   <h2 style={{color: 'black'}}>{x.disc}</h2>
                   <br />
                   {'"a benevolent smile"'}
                 </Typography>
               </CardContent>
               <CardActions>


               </CardActions>
             </Card>
             <Card className={"".card} style={{margin: '5px'}}>


                   <CardActions>
                     <Button onClick={()=>{this.show_item_info(x)}} size="small">add to cart</Button><Button size="small">Buy Now</Button><Button size="small">Bid</Button><Button size="small">Trade</Button>
                   </CardActions>
                 </Card>
         <Paper style={{width: '100%'}}><Grid container spacing={3}>



           </Grid>
         </Paper>
       </Grid>
     </Grid>


 </Box>
 <Typography/>
 <div><CommentsView/></div>
</Container>

</React.Fragment>













        </>
        })
      }













      </>
    );
  }

}

export default ItemViewPage;
