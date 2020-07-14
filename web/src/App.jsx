import React, { Component, Fragment } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import {
  signIn,
  signOut,
  signUp
} from './api/auth';
import api from './api/init';
import "./css/LoginPage.css";

import { getDecodedToken } from './api/token';
import LoginPage from "./Pages/LoginPage";
import AdminPage from './Pages/AdminPage';
import UserPage from "./Pages/UserPage";

export default class App extends Component{

constructor(props){
   super(props)
   
  this.state={
    reservations:null,
    decodedToken: getDecodedToken()
 
}
this.setReservation=this.setReservation.bind(this); 
 
}
setReservation(reservations){
     
  this.setState({
    reservations
  });
         
}

 
  onSignUp = ({ name, department, institute, email, password }) => {
    signUp({ name, department, institute, email, password })
    .then(decodedToken => {
      this.setState({ decodedToken })
   })
  }

  onSignIn = ({ email, password }) => {
    signIn({ email, password }).then((decodedToken) => {
      this.setState({decodedToken})
    })
  }

  onSignOut = () => {
      signOut()
      this.setState({ decodedToken: null})
    }


  componentDidMount(){
   api.get(`/reservations`)
    .then(reservations=>this.setReservation(reservations.data))
    .catch(error=>error)
}

  render(){
    const {
      decodedToken
    } = this.state

    
    const signedIn = !!decodedToken;
    const userId = decodedToken?decodedToken.sub:null
    const userEmail = decodedToken?decodedToken.email:null
    const isAdmin = decodedToken?decodedToken.admin:null
    const signOut = this.onSignOut;
    const requireAuth = render => () =>
    signedIn ? render() : <Redirect to="/login" />
    return (
    
   

        <Switch>
         <Route path="/" exact>
           <Redirect to="/login"/>
          </Route> 
        <Route path="/login" exact render={() => (!!decodedToken && signedIn ?
                  (isAdmin?(<Redirect to="/admin/dashboard" exact/>):(<Redirect to="/user/makebooking" exact/>)) :
                  <div className="LoginPage">
                    <LoginPage onSignIn={this.onSignIn} onSignUp={this.onSignUp}/>
                  </div>
                  )} />

                                     
                     
 
             <Route path="/user" render={() => (
                  <Fragment>
                  {
                   !!decodedToken && !isAdmin && 
                    (
                      <div className="wrapper">
                         <UserPage signOut={signOut}  isAdmin={isAdmin} userId={userId} userEmail={userEmail}/>
                        </div>
                        
                    )}
                  </Fragment>
                )} />
                 
                  <Route path="/admin" render={() => (
                 
                 <Fragment>
                    {
                    !!decodedToken && isAdmin &&
                    (
                      <div className="wrapper">
                         <AdminPage signOut={signOut}
                          isAdmin={isAdmin} userId={userId}
                     
                         />
                          
                        </div>
                        
                    )}
                  </Fragment>
                )} />
           
              <Route path="calendar" />

          
        </Switch>
    
  );
}
}


