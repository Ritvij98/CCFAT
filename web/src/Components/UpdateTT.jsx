import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import api from "../api/init";


class UpdateTT extends Component{
    constructor(props){
        super(props)
        this.state ={
            chosenDate: null,
            chosenDate2: new Date(),
            reservationsOnChosenDate:null,
            recurringBookings:null,
            reservation:null,
            reservation2:null,
            dob:null
            

        }
        this.setReservationsOnChosenDate = this.setReservationsOnChosenDate.bind(this);
        this.handleChangeForChosenDate = this.handleChangeForChosenDate.bind(this);
        this.handleChangeForChosenDate2 = this.handleChangeForChosenDate2.bind(this);
        this.setRecurringSelect = this.setRecurringSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.submitHandler2 = this.submitHandler2.bind(this);
    }
    setRecurringSelect(recurringBookings){
        this.setState({recurringBookings})
    }
    handleChangeForChosenDate(chosenDate){
        this.setState({chosenDate})
    }
    handleChange(value){
      
        var a=value.split(" ")
        this.setState({
          reservation:a[0],dob:a[1]
        });
            
    }
   
    submitHandler(event){  
        
        const {chosenDate,reservation,dob} =this.state;       
        const updationDetails = {
            reservation:reservation,
            chosenDate:chosenDate,
            dob:dob
        }
   
        api.put(`/reservations/recurring`,updationDetails,{
            headers:{
                'Content-Type':'application/json'
            }
        });  
        alert("Slot Freed !")
    }  

    setReservationsOnChosenDate(reservationsOnChosenDate){
        this.setState({reservationsOnChosenDate})
    }
    
    handleChangeForChosenDate2(date){
              
        if(date<=new Date()){
            alert("Can't select an old date, Select upcoming reservations.");
            return;
        }
        this.setState({chosenDate2:date});
                api.get(`/reservations/${moment(date).toISOString()}`)
               .then(res=>this.setReservationsOnChosenDate(res.data))
               .catch(error=>error)
           
    }
    
    handleChange2(value){
         this.setState({
          reservation2:value
        });
       }
    
    submitHandler2(event){  
        api.delete(`/reservations/delete/${this.state.reservation2}`)
        .then(res => console.log("deleted!"));  
        alert("Reservation Deleted !")
    }  

    componentDidMount(){
        api.get(`/reservations/recurring`)
        .then(recurringBookings=>this.setRecurringSelect(recurringBookings.data))
        .catch(error=>error)
    }
   
    render(){
        const {recurringBookings,chosenDate,chosenDate2,reservationsOnChosenDate} = this.state;
        if(!recurringBookings){
            return (<h4>Loading...</h4>)
        }
        return(
            <div>
                <form >
                <div className="form-group col-md-10">
                <label>Choose the recurring reservation to free the slot on : </label>
                <select className="form-control"name="reservation" defaultValue="none" onChange={(event) => this.handleChange(event.target.value)} >
                <option selected>Open this select menu</option>
                    {this.state.recurringBookings.map((x) => {
                                    return <option value={x._id+" "+x.dob}>
                                        {moment(x.dob).format("DD/MM/YY")} to {moment(x.recurringEndDate).format("DD/MM/YY")} ,
                                        {moment(x.st).format("hh:mm a")} - {moment(x.et).format("hh:mm a")}
                                        </option>
                                    })
                        }          
                </select>
                </div>
                <div className="form-group col-md-10">
                <label>Choose the date to free the slot on : </label>                                        
                <DatePicker selected={chosenDate} onChange={this.handleChangeForChosenDate} className="form-control"/>
                </div>
                <div className="form-group col-md-10">
                <button type="submit" className="btn btn-primary " onClick={this.submitHandler}>Free Slot</button>
                </div>
                </form>    
                <br />
        
                <hr/>
                <br />
                <br />
                   
                <form >
                <div className="form-group col-md-10">
                <label>Choose the date to cancel the reservation on ( to delete recurring bookings, select their starting date): </label>                                        
                <DatePicker selected={chosenDate2} onChange={this.handleChangeForChosenDate2} className="form-control"/>
                </div>
                <div className="form-group col-md-10">
                <label>Choose the reservation to be cancelled : </label>
                <select className="form-control"name="reservation2" defaultValue="none" onChange={(event) => this.handleChange2(event.target.value)} >
                <option selected>Open this select menu</option>
                                {
                                reservationsOnChosenDate &&
                                (reservationsOnChosenDate.map((x) => {
                                            return <option value={x._id}>
                                                {moment(x.st).format("hh:mm a")} - {moment(x.et).format("hh:mm a")}
                                                </option>
                                            })
                                )
                            }          
                </select>
                </div>
               
                <div className="form-group col-md-10">
                <button type="submit" className="btn btn-primary " onClick={this.submitHandler2}>Cancel</button>
                </div>
                   
                </form>
                
              
            </div>
                
        )
    }
}
export default UpdateTT ;