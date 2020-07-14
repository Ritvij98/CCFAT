import React, { Component } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "../css/Reservations.css";
import moment from "moment";
const reservationsHeader={
    "Booked For":"dob",
    "Start Time":"st",
    "End Time":"et",
    "Purpose":"purpose",
    "Participants":"nop",
    "Status":"approvalStatus"
}
class Reservations extends Component{
    constructor(props){
        super(props);
        this.state={
            term:null
        }
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    onSearchHandler = e => {
        this.setState({
          term: e.target.value
        })
      };
    render(){
        const {result}=this.props;
        if(!result){return <h3>Loading...</h3>}
        return(
            <div>
                <div className="reservations__route--header">
                   
                    <h1>Reservations</h1>

                    <div className="reservations__route--button">
                    <Link to="/admin/makebooking">
                        <button type="button" className="btn btn-secondary">
                        + Make new Reservation
                        </button></Link>
                    </div>
                    
                    <form className="col-md-3 pl-0 "> 
                        <div className="input-group my-4">
                                    <input type="text"  onChange={this.onSearchHandler}
                                                value={this.state.term}
                                                className="form-control" 
                                                placeholder="Search..."
                                                />
                         </div>
                  </form>

                </div> 
                
                <hr />

                <table className="table table-hover ">
                <thead className="thead-light">
                    {Object.keys(reservationsHeader).map((key)=>{

                           return (
                               <th>
                                   {key}
                               </th>
                           ) 
                    })}
                </thead>
                    <tbody>
                    {
                    this.state.term?
                    result
                    .filter(reservation => {
                                           return (reservation.purpose == this.state.term)
                                      })
                    .map((reservation)=>{
                        
                                        return (
                                            <tr>
                                                {
                                                    Object.values(reservationsHeader)
                                                    
                                                    .map((value)=>{
                                                        if(value==="dob"){
                                                            return (
                                                                <td>
                                                                    {moment(reservation[value]).format("DD-MM-YYYY")}
                                                                </td>
                                                            ) 
                                                        }
                                                        if(value==="st"){
                                                            return (
                                                                <td>
                                                                    {moment(reservation[value]).format("hh:mm a")}
                                                                </td>
                                                            ) 
                                                        }
                                                        if(value==="et"){
                                                            return (
                                                                <td>
                                                                    {moment(reservation[value]).format("hh:mm a")}
                                                                </td>
                                                            ) 
                                                        }
                                                        if(value==="approvalStatus"){
                                                            if(reservation["responded"]===true){
                                                               return (
                                                                <td>
                                                                   {reservation[value]?"Approved":"Declined"}
                                                                </td>
                                                            )   
                                                            }else{
                                                                return (
                                                                <td>
                                                                    Requested
                                                                </td>
                                                            )    
                                                            }
                                                           
                                                        }
                                                            return (
                                                                <td>
                                                                    {reservation[value]}
                                                                </td>
                                                            ) 
                                                            })
                                                }
                                            </tr>
                                        )
                                        
                                    })
                      :    
                    result.map((reservation)=>{
                        return (
                            <tr>
                                {
                                    Object.values(reservationsHeader)
                                    
                                    .map((value)=>{
                                        if(value==="dob"){
                                            return (
                                                <td>
                                                    {moment(reservation[value]).format("DD-MM-YYYY")}
                                                </td>
                                            ) 
                                        }
                                        if(value==="st"){
                                            return (
                                                <td>
                                                    {moment(reservation[value]).format("hh:mm a")}
                                                </td>
                                            ) 
                                        }
                                        if(value==="et"){
                                            return (
                                                <td>
                                                    {moment(reservation[value]).format("hh:mm a")}
                                                </td>
                                            ) 
                                        }
                                        if(value==="approvalStatus"){
                                            if(reservation["responded"]===true){
                                               return (
                                                <td>
                                                   {reservation[value]?"Approved":"Declined"}
                                                </td>
                                            )   
                                            }else{
                                                return (
                                                <td>
                                                    Requested
                                                </td>
                                            )    
                                            }
                                           
                                        }
                                            return (
                                                <td>
                                                    {reservation[value]}
                                                </td>
                                            ) 
                                            })
                                }
                            </tr>
                        )
                     })
                   }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Reservations ;