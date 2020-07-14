import React, { Component } from "react";
import api from "../api/init";
import moment from "moment";
const Loading = require('react-loading-animation');
const reservationsHeader={
    "Booked For":"dob",
    "Start Time":"st",
    "End Time":"et",
    "Purpose":"purpose",
    "Participants":"nop",
    "Status":"approvalStatus"
}
class RecordData extends Component{
    constructor(props){
        super(props)
        this.state = {
            recordData:null,
            userReservations:null
        }
        this.setRecordData = this.setRecordData.bind(this); 
        this.setUserReservations = this.setUserReservations.bind(this); 
        this.deleteRecord = this.deleteRecord.bind(this); 
        this.handleclick = this.handleclick.bind(this);

    }
   
    handleclick(){
      
        this.props.changeRenderRecordStateFunc();
    }

    setRecordData(recordData){
        this.setState({
            recordData
        })
    }

    setUserReservations(userReservations){
        this.setState({
            userReservations
        })
        
        
    }
    
    deleteRecord(){
        if(this.props.tabName==="Users"){
        api.delete(`/records/userdata/${this.state.recordData._id}`)
        .then(res=>{console.log(res.data);
        this.handleclick()
        })
    }else if(this.props.tabName==="Departments"){
        api.delete(`/records/deptdata/${this.state.recordData._id}`)
        .then(res=>{console.log(res.data);
        this.handleclick()
        })
    }else if(this.props.tabName==="Institutes"){
        api.delete(`/records/instdata/${this.state.recordData._id}`)
        .then(res=>{console.log(res.data);
        this.handleclick()
        })
    }
    }
    componentDidMount(){
 
        if(this.props.tabName==="Users"){

            Promise.all([
                api.get(`/records/userdata/${this.props.recordID}`),
                api.get(`/records/mybookings/${this.props.recordID}`)
            ])
              .then(([userData, userReservations]) => {
                this.setRecordData(userData.data);
                this.setUserReservations(userReservations.data);
               
              
              })
               .catch(error => console.log(error));
       
        
        }else if(this.props.tabName==="Departments"){
            api.get(`/records/deptdata/${this.props.recordID}`)
              .then(res=>this.setRecordData(res.data))
              .catch(error => console.log(error))

        }else if(this.props.tabName==="Institutes"){
            api.get(`/records/instdata/${this.props.recordID}`)
              .then(res=>this.setRecordData(res.data))
              .catch(error => console.log(error));

   }
  
   
    }
    render(){
        const {recordData,userReservations} = this.state
        const {tabName} = this.props;
        if(!recordData){
           return <Loading />
        }
        return(
            <div>
                <button className="btn btn-outline btn-secondary" onClick={this.handleclick}> ← Back </button>
                <br/>
                <br/>
                <div>
                        {
                        tabName==="Users" &&
                        <ul style={{listStyle:"none"}}>
                        <li>ID: {recordData._id}</li>
                        <li>Name: {recordData.name}</li>
                        <li>Dept: {recordData.department}</li>
                        <li>Institute: {recordData.institute}</li>
                        <li>Email: {recordData.email}</li>
                        <li>Created On: {recordData.createdAt}</li> 
                        </ul> }
                        {tabName==="Departments" &&
                            (<ul style={{listStyle:"none"}}>
                            <li>ID: {recordData._id}</li>
                            <li>Name: {recordData.name}</li>
                            <li>Institute: {recordData.institute}</li>
                            <li>Created On: {recordData.createdAt}</li> 
                            </ul>)
                            }
                      {tabName==="Institutes" &&
                            <ul style={{listStyle:"none"}}>
                            <li>ID: {recordData._id}</li>
                            <li>Name: {recordData.name}</li>
                            <li>Created On: {recordData.createdAt}</li> 
                            </ul>
                          
                        }
                   
                    <button className="btn btn-outline btn-secondary" style={{margin:"1rem"}} onClick={this.deleteRecord}>Delete Record</button>
                </div>
                <hr />
                {tabName==="Users" && userReservations?
                
                <div>
                <h3>Reservations</h3>
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
                    userReservations.map((reservation)=>{
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
                :''}
                
                
                
               
           </div>
        )
    }
}
export default RecordData;