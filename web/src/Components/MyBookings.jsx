import React, { Component } from "react";
import "../css/Reservations.css";
import moment from "moment";
import api from "../api/init"
const reservationsHeader={
    "Booked For":"dob",
    "Start Time":"st",
    "End Time":"et",
    "Purpose":"purpose",
    "Participants":"nop",
    "Status":"approvalStatus"
}
class MyBookings extends Component{
    constructor(props){
        super(props);
        this.state={
             result:null
         }
        this.setReservation=this.setReservation.bind(this);
    }
    
    setReservation(result){
        this.setState({result})
    }
    
    componentDidMount(){
        api.get(`/records/mybookings/${this.props.userId}`)
        .then(result=>this.setReservation(result.data))
        .catch(error=>error)
    }
   
    render(){
        const {result}=this.state;
        if(!result){return <h3>Loading...</h3>}
        return(
            <div>
                <div className="reservations__route--header">
                    <h1 className="ml-3">Reservations</h1>
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
export default MyBookings ;

