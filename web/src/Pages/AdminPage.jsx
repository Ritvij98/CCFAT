import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from 'react-router-dom';


import Dashboard from "../Components/Dashboard";
import Header from "../Components/Header";
import Records from "../Components/Records";
import Calendar from "../Components/Calendar"
import Reservations from "../Components/Reservations";
import Makebooking from "../Components/MakeBooking";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import UpdateTT from "../Components/UpdateTT";
import api from '../api/init'


export default class AdminPage extends Component{

constructor(props){
   super(props)
   
  this.state={
    reservations:null,
   
}
this.setReservation=this.setReservation.bind(this); 
 
}
setReservation(reservations){
     
  this.setState({
    reservations
  });
         

}


  componentDidMount(){
    api.get(`/reservations`)
    .then(response=>response.data)
    .then(reservations=>this.setReservation(reservations))
    .catch(error=>error)
}

  render(){
  
    return (
    <Router>
    
    <div className="fluid-container">
      <Row><Col><Header signOut={this.props.signOut} isAdmin={this.props.isAdmin}/></Col></Row>
      <Row><div style={{height:"64px"}}></div></Row>
     <Row >
       

      
     
      
      <Col xs={2}>

        <ul className="Menu">
          
            <NavLink exact to="/admin/dashboard" className="Menu-item "><li className="Menu-item-text">Dashboard</li></NavLink>
          
          
            <NavLink to="/admin/records" className="Menu-item"><li className="Menu-item-text">Records</li></NavLink>
          
          
            <NavLink to="/admin/makebooking" className="Menu-item" ><li className="Menu-item-text">MakeBooking</li></NavLink>
          
          
            <NavLink to="/admin/reservations" className="Menu-item" ><li className="Menu-item-text">Reservations</li></NavLink>
          
          
            <NavLink to="/admin/updatett" className="Menu-item"><li className="Menu-item-text">Update Timetable</li></NavLink>
   
          <li></li>
        </ul>
       </Col>


        <Col>
        
        <hr/>

        <Switch>
        
          <Route exact path="/admin/dashboard">
          <Dashboard reservations={this.state.reservations}/>
           </Route>
          <Route path="/admin/records">
            <Records />
          </Route >
          <Route path="/admin/makebooking">
            <Makebooking reservations={this.state.reservations}  isAdmin={this.props.isAdmin} userId={this.props.userId}/>
          </Route >
          <Route path="/admin/reservations">
            <Reservations result={this.state.reservations}/>
          </Route>
          <Route path="/admin/updatett">
            <UpdateTT />
          </Route>
                  
          <Route path="/admin/calender">
          <Calendar  isAdmin={this.props.isAdmin}/>
           </Route>
        </Switch>
        </Col>
      
    
    </Row>
    
    </div>
    </Router>
  );
}
}

