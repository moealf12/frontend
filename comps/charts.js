  import React, { Component } from 'react';
import { Doughnut,Bar,Linke,Pie } from 'react-chartjs-2';
import _ from 'lodash'
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { createMuiTheme,ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';



class UserCharts extends Component {
  constructor(props){
    super(props)
    this.state={
      resp:null,
      cu:null,
      ci:null,
      views:null,
      data:null
    }
  }

  componentDidMount() {
    const l = localStorage['username']
    fetch('http://localhost:5000/database')
    .then(res=>res.json())
    .then(res => this.setState(
      {resp:res.posts,
      cu:l}
    ))


  }













  render() {
    const data = {
    labels: [],
    price:[],
    datasets: [
      {
        label: 'posted items',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: []
      }
    ]
  };

  const data_vi = {
  labels: [],
  Vie:[],
  datasets: [
    {
      label: 'items Views ~',
      backgroundColor: 'rgba(255,99,132,0.2)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: []
    }
  ]
};
    var market_value = null
    const store_data = []
    const {resp,cu} = this.state
    const v_count = [{}]
    const collect_v = []
    const hold_name_view = []
    const hold_price_view = []
    var user_views = []
    var cu_views = []
    var instore = null
    var grap_views = []
    var grap_views_byItem = []
    var grap = []
    var set_grip = []
    var colleect_views = []
    const geoUrl ="https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"
    var v = 0
    var r = 0



    const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#ff4400',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});











    return (


      <>
      <div className="container">
          <nav>
              <h1 class="brand"><a href="index.html">Designer<span>H</span>up</a></h1>


              <ul>
                  <li><a href="/">Home</a></li>
                  <li>
                  <a><ThemeProvider theme={theme}>
                  <Button color="primary">Primary</Button>
                  <Button color="secondary">Secondary</Button>
                </ThemeProvider></a>
              </li>



              </ul>
            </nav>
          </div>
      <Box component="span" m={10}>

      <Paper style={{width: '100%' , alignItems: 'center'}}>
  <Typography >


      <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Typography component="div" />


      <div className='DarkMode'>
      <div className='text-flicker-in-glow'/>
        <div className="menu-toggle" id="hamburger">
            <i className="fas fa-bars"></i>
        </div>
        <div className="overlay"></div>


                {
                  (resp != null) ?  resp.map(x=>{
                    x.instore.forEach(x=>{
                      (x.postedby == cu) ? store_data.push(x):console.log('pass')
                      console.log();
                    })
                  }):console.log('loading')
                }

                {
                  (store_data == null || store_data.length == 0 ) ? console.log('oki'):store_data.map(i=>{
                    data['labels'].push(i.itemname)
                    data.datasets.map(x=>{
                      data['price'].push(parseInt(i.itemprice))
                    x.data.push(i.itemprice)
                    })

                  })
                }


                {
                  (data['price'] == null || data['price'].length== 0 ) ? console.log('loading'):data['price'] = data['price'].reduce((x,y)=> x+y)
                }

                {
                  console.log("before:",cu_views)
                }






                {
                  (resp != null ) ? resp.forEach(x=>{
                    return (x.username == cu) ? grap_views.push(x):null
                  }):null
                }
                {
                  (grap_views != null) ? grap_views.map(x=>{
                    x.instore.map(q=>{
                      data_vi.labels.push(q.itemname)
                      grap_views_byItem.push(q.itemname)
                    })
                  }):null
                }
                {
                  grap_views.map(x=>{
                    x.Views.map(q=>{
                      grap.push(q)
                    })
                  })
                }
                {
                  grap.forEach(x=>{
                    (data_vi.labels.includes(x.itemname) == true) ? set_grip.push({'item_name':x.itemname,'len':[]}):console.log('nah')
                  })
                }
                {
                  data_vi.datasets.map(x=>{
                    x.data.push(set_grip.length)
                  })

                }
                {
                  grap_views.map(x=>{
                    x.Views.map(q=>{
                      return (q.itemname == data_vi.labels.map(x=>{return x})) ? colleect_views.push({'item_name':q.itemname,'item_views':v=v+1}):null
                    })
                  })

                }
                {
                  console.log(colleect_views)

                }





























        </div>




      {

      }





    <div>

  </div>

<div >
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={'c'.paper}><div>
            <h2 style={{'padding-left':'25%'}}> Store Value : {data['price']}</h2>
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div></Paper>
        </Grid>
        <Grid item xs>
          <Paper ><div>
            <h2 style={{'padding-left':'25%'}}>Views: {set_grip.length}</h2>
            <Bar
              data={data_vi}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div></Paper>
        </Grid>
        <Grid item xs>
          <Paper ><div>
            <h2 style={{'padding-left':'25%'}}>Orders : {data_vi['price']}</h2>
            <Bar
              data={data_vi}
              width={100}
              height={50}
              options={{
                maintainAspectRatio: false
              }}
            />
          </div></Paper>
        </Grid>

      </Grid>

    </div>
    <div>
      <Grid item xs>
        <Paper >
          <div>
          <h2 style={{'padding-left':'25%'}}>Orders : {data_vi['price']}</h2>
          <Bar
            data={data_vi}
            width={100}
            height={50}
            options={{
              maintainAspectRatio: false
            }}
          />
        </div>
      </Paper>
      </Grid>
    </div>
  </Container>
  </React.Fragment>
  </Typography>



</Paper>


</Box>



    </>
    );
  }

}

export default UserCharts;
