import React, { Component } from "react";
import moment from "moment";
import "../css/tabs.css";
import "../css/BookingTable.css";
import {dailyBookings, bookingArray } from '../Helpers/functions';


class BookingsColumn extends Component{
    constructor(props){
        super(props)
          
    
                }
                columnMapper = (dayHours) => {
                    let tableCol = [];
                    for (var i = 0; i < 13; i++) {
                     
                      let bookingData = dayHours[i + 8]
                      let k=i>4?(i-4):i+8;
                      let t=i>3?"pm":"am";
                     
                      if (typeof bookingData == 'number') {
                        tableCol.push(
                        <tr className="table__row--full">
                            <td>
                                {k}{t}
                            </td>
                        <td>
                              &nbsp;
                        </td>
                        </tr>)
     
                        } else {
                          tableCol.push(
                            <tr className="table__row--full">
                            <td>
                                {k}{t}
                            </td>
                            <td>
                              <span
                               
                                className={`
                                ${bookingData.firstHalfHour ?'first-half-hour--bt' : (bookingData.secondHalfHour ? 'second-half-hour--bt' : 'full--bt')}
                                `}
                              >
                                &nbsp;
                              </span>
                            </td>
                            </tr>
                          )
                        }
                      }
                      
                      return tableCol
                    }
render(){
    return(
        <table className="table--booking">
            <thead>
                <tr className="table__row table__row--header">
                <th colSpan="2" className="table__cell--header table__cell--level header__heading">
                    {moment(this.props.chosenDate).format("Do MMMM YYYY")} 
                </th>
                </tr>
                <tr className="table__row table__row--subheader">
                <th className="table__cell--header">Time</th>
                <th className="table__cell--header">Bookings</th>
                </tr>
            </thead>
            <tbody className="table__body--booking">
                {this.columnMapper(bookingArray(dailyBookings(this.props.chosenDate,this.props.reservations)),this.props.chosenDate)}
            </tbody>
    </table>
    )
}
}

export default BookingsColumn;