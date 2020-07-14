import React, { Component } from "react";
import {dailyBookings, bookingArray } from '../Helpers/functions';
import moment from 'moment';
import "../css/Schedule.css";
import api from "../api/init"

const Loading = require('react-loading-animation')

const weekdays=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const timeSlots = [
    "8am",
    "9am",
    "10am",
    "11am",
    "12pm",
    "1pm",
    "2pm",
    "3pm",
    "4pm",
    "5pm",
    "6pm",
    "7pm",
    "8pm"
] 

const today =new Date();
let disable;

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state={
            result:null,
            rerender:this.props.changed,
            weekNumber:0
        }
        this.setReservation=this.setReservation.bind(this);
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
    }
    
    setReservation(result){
     
        this.setState({
            result:result.filter((value)=>{
                return value.approvalStatus===true //////EEEEEEE////////
              })
        });
    
    }
   
    componentDidMount(){
        api.get(`/reservations`)
        .then(result=>this.setReservation(result.data))
        .catch(error=>error)
    }
  

    rowMapper = (dayHours,date) => {
    
    let tableRow = [];
  
    if(date < today){
        disable =true;
      }else{
        disable=false;
    }
    
    for (var i = 0; i < 13; i++) {
    
      let bookingData = dayHours[i + 8]

      if(disable) {
        tableRow.push(
            <td className="Cell--OldDates">
            &nbsp;
            </td>
        )
      }
      
      else if (typeof bookingData == 'number') {

            tableRow.push(
                <td className="Cell">
                &nbsp;
                </td>
            )
  
    } else {
            tableRow.push(
                <td className="Cell">
                    <span
                        className={`
                        ${bookingData.firstHalfHour ?'first-half-hour' : (bookingData.secondHalfHour ? 'second-half-hour' : 'full')}
                        `} 
                    >
                    &nbsp;
                    </span>
                </td>
            )
        }
    }
      
    return tableRow
    
    }
   
    today = () => {
        this.setState({
            weekNumber: 0
        });
    }
    
    nextWeek = () => {
        this.setState({
            weekNumber: this.state.weekNumber+7
        });
    }
   
    previousWeek =() => {
        this.setState({
            weekNumber: this.state.weekNumber-7
        });
    }
   

    render(){
        
     const {result}=this.state;   

     let date=new Date();
     let k = date.getDay()+1;
     date.setDate(date.getDate()- k + this.state.weekNumber);
        
     
        if(!result){return <Loading/>}
        return(
            
            <div className="container">
                
                <div className="row justify-content-center mb-2 mt-2">
                    <button type="button" className="btn btn-outline btn-sm mr-3" onClick={this.previousWeek}>
                    <i className="fa fa-angle-left" style={{fontSize:"36px",fontWeight:"bolder",color:"#5e5e5e"}}></i>
                    </button>
                    <button type="button" className="btn btn-outline-dark btn-sm " onClick={this.today}>Today</button>
                    <button type="button" className="btn btn-outline btn-sm ml-3" onClick={this.nextWeek}>
                    <i className="fa fa-angle-right" style={{fontSize:"36px",fontWeight:"bolder",color:"#5e5e5e"}}></i>
                    </button>
                </div>
                
                <div className="Schedule">
                <table className="row ScheduleTable">
                       
                       <thead> 
                        <tr>
                        <th className=" Header--Cell">
                            &nbsp;
                        </th>
                        {
                           timeSlots.map((slot,index)=> {
                               return(
                                    <th key={index}className=" Header--Cell">
                                      {slot}
                                    </th>
                               )}
                           )
                        }
                       
                        </tr>
                        </thead>
                        
                        <tbody>
                            {
                                weekdays.map((day)=>{
                              
                                    date.setDate(date.getDate()+1)
                            
                                    if(moment(date).format("dddd")===day){
                                    
                                        return (<tr>
                                                    <th className="Header--Cell">
                                                        {day}  {moment(date).format("DD/MM")}
                                                    </th>        
                                                        {this.rowMapper(bookingArray(dailyBookings(date,result)),date)}
                                                </tr>)
                                        }
                                
                                    else{

                                        return (<tr>
                                                <th className="Header--Cell">
                                                   {day}  {moment(date).format("DD/MM")}
                                                </th>        
                                                   {this.rowMapper([...Array(24).keys()],date)}
                                                </tr>)
                               
                                    }
                                })
                            }
                        
                        </tbody>
                        
                </table>
                </div>
                
                <ul className="row justify-content-center legend">
                    <li><span className="available"></span>Available</li>
                    <li><span className="notavailable"></span>Not Available</li>
                </ul>
           
            </div>

        )
    }
}

export default Schedule ;

































// If the data is an array, there are two booking objects
      // } else if (Array.isArray(bookingData)){
      //   console.log(bookingData);
        
      // // Determine which of the two bookings comes first and second
      // let firstBookingData = bookingData[0].firstHalfHour ?
      //   bookingData[0] : bookingData[1]
  
      // let secondBookingData = bookingData[0].secondHalfHour ?
      //     bookingData[0] : bookingData[1]
  
      //     tableRow.push(
      //       <table className="table--booking--split">
      //         <tbody>
      //           <tr>
      //             <td className={`table__cell`}>
      //               <span
      //                 onClick={() => props.onShowBooking(firstBookingData)}
      //                 className={`table__cell--booked table__cell--${firstBookingData.businessUnit // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
      //                   .replace(/ /g, '-')
      //                   .toLowerCase()}
      //                 `}
      //               >
      //                 &nbsp;
      //               </span>
      //             </td>
      //             <td className={`table__cell`}>
      //               <span
      //                 onClick={() => props.onShowBooking(secondBookingData)}
      //                 className={`table__cell--booked table__cell--${secondBookingData.businessUnit // Class name will show the business unit that made the booking, and whether the <td> element should be fully shaded, or half shaded (indicating a half-hour booking)
      //                   .replace(/ /g, '-')
      //                   .toLowerCase()}
      //                 `}
      //               >
      //                 &nbsp;
      //               </span>
      //             </td>
      //           </tr>
      //         </tbody>
      //       </table>
      //     )
        