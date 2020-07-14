import React, { Component } from "react";
import {
  BrowserRouter as Router,
   NavLink
} from 'react-router-dom';
class Header extends Component{
  constructor(props){
    super(props)
  }
    render(){
        return(

          
            <div className="HeaderBar">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
              <a className="brand-ccfat" href="#home">CCFAT</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <div className="mr-auto">
              {this.props.isAdmin?<div></div>:( 
                <ul className="navbar-nav  ml-4">
                
                  <li className="nav-item active">
                    <a className="nav-link" href="/user/makebooking">New Booking<span className="sr-only">(current)</span></a>
                  </li>
                
                  <li className="nav-item">
                    <a className="nav-link" href="/user/mybookings">My Bookings</a>
                  </li>
                </ul>
                
                )}
                </div>
                {this.props.isAdmin?<NavLink to="/admin/calender">Academic Calender</NavLink>:<NavLink to="/user/calender">Academic Calender</NavLink> }
                
                
              
            
                <a className="nav-link" href="/login" onClick={this.props.signOut}>Logout</a>
                
              
              </div>
            </nav>
              
            </div> 
            
        )
    }
}
export default Header ;