import React, { Component } from 'react';
import {Card,Button,Accordion} from 'react-bootstrap'
import SnackbarContent from '@material-ui/core/SnackbarContent';
import TemporaryDrawer from './message2'
class ShowMessages extends Component {

  render() {
    const  {from,messagebody} = this.props
    const q = messagebody
    return (
      <>

      <Accordion>
      <Card style={{width: "100%" ,margin: "0 auto"}}>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey="1">
            {from}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>

          <h5>{from} : {messagebody}</h5>




          <button>Rplay</button>
          <button>DEL</button>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>

    <div className={'c'.root}>
      <SnackbarContent className={'c'.snackbar} action={''} >
        hellodddd
      </SnackbarContent>


    </div>

  </>
    );
  }

}

export default ShowMessages;
