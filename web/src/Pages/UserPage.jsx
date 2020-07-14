import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
 } from 'react-router-dom';
import MyBookings from "../Components/MyBookings";
import Makebooking from "../Components/MakeBooking";  
import Header from "../Components/Header"; 
import Calendar from "../Components/Calendar"; 
import "../css/UserPage.css"
import api from "../api/init";

function About(){
  return(
    <div className="mt-5">
      About CCFAT
    </div>
  )
}
function Contact(){
  return(
    <div className="mt-5">
      <h3>Email:</h3>
    </div>
  )
}
export default class UserPage extends Component{

  constructor(props){
    super(props) 
    this.state={
        reservations:null
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
    .then(reservations=>this.setReservation(reservations.data))
    .catch(error=>error)  
  }
  
  render(){
   
    if(!this.state.reservations){
        return (<h1>Loading...</h1>)
    }
   
    return(
        <div className="userpage_wrapper">
          <div className="userpage_header">
              <Header signOut={this.props.signOut} userId={this.props.userId} isAdmin={this.props.isAdmin} />
          </div>
       

        <div className="userpage_content">
          
        <Switch>
        <Route exact path="/user/mybookings">
        <MyBookings result={this.state.reservations}  isAdmin={this.props.isAdmin} userId={this.props.userId} userEmail={this.props.userEmail}/>
        </Route>
        <Route path="/user/makebooking">
        <div className="ml-5">
          <Makebooking reservations={this.state.reservations}  isAdmin={this.props.isAdmin} userId={this.props.userId}/>
        </div>
        </Route >
        <Route path="/user/calender">
        <Calendar  isAdmin={this.props.isAdmin}/>
        </Route >
        <Route path="/user/about">
        <About/>
        </Route >
        <Route path="/user/contact">
        <Contact/>
        </Route >
        </Switch>
      
        </div>

        <footer className="userpage_footer">
         
            <ul className="list-unstyled list-inline text-center py-2"style={{padding:"0.5rem 0 0 0",marginBottom:"0"}}>
                <li className="list-inline-item">
                <NavLink to="/user/about">About</NavLink>
                </li>
                <li className="list-inline-item">
                  |
                </li>
                <li className="list-inline-item">
                <NavLink to="/user/contact">Contact</NavLink>
                </li>
              </ul>
      
          <div className="text-center"style={{padding:"0.2rem 0 0.5rem 0"}}>
            <a href="">Central Computing Facility, Innovation Center, MIT, Manipal</a>
          </div>
        
        </footer>
      

      </div>
    )
  }
}


