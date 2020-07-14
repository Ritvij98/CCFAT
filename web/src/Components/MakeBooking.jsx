import React, { Component } from "react";
import moment from "moment";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import DatePicker from "react-datepicker";
import Schedule from "./Schedule";
import "../css/tabs.css";
import "../css/BookingTable.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {dailyBookings } from '../Helpers/functions';
import {ExcludeTimeArray} from '../Helpers/excludeTimeArray';
import "react-datepicker/dist/react-datepicker.css";
import BookingsColumn from "./BookingsColumn";
import api from "../api/init";
let finalArray;
class MakeBooking extends Component{
constructor(props){
    super(props)
        this.state = {
                rerender:false,
                disableRecurring:1,
                recurringEndDate:null,
                bookingColumn: [],
                excludeTimeArraySt: [],
                excludeTimeArrayEt:[],
                chosenDate: new Date(),
                st: '',
                et: '',
                purpose:'',
                nop:''
                };


    this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
    this.handleChangeForStartTimePicker = this.handleChangeForStartTimePicker.bind(this);
    this.handleChangeForEndTimePicker = this.handleChangeForEndTimePicker.bind(this);   
    this.handleChangeForChosenDate = this.handleChangeForChosenDate.bind(this);
    this.toExcludeTimes = this.toExcludeTimes.bind(this)
    this.setBookingColumn = this.setBookingColumn.bind(this);     
    this.handleChangeForRecurringEndDate = this.handleChangeForRecurringEndDate.bind(this);  
  
    }

     onToggleRecurring = (value) => {
        let disableRecurring
        if (value === 'none') {
          disableRecurring = 1
        } else {
          disableRecurring = 0
        }
        this.setState({disableRecurring: disableRecurring})
    }

    handleChangeForRecurringEndDate(date){
        this.setState({recurringEndDate:date}); 
    }

    handleChangeForChosenDate(date){
        if(date<=new Date()){
            alert("Can't select an old date");
            return;
        }
        this.setState({chosenDate:date});
               api.get(`/reservations/${this.state.chosenDate.toJSON()}`)
               .then(bookingColumn=>this.setBookingColumn(bookingColumn.data),this.toExcludeTimes)
               .catch(error=>error)
            //    setTimeout(()=>{},1000)
                
               setTimeout(this.toExcludeTimes,1000)
    }

    setBookingColumn(bookingColumn){
        this.setState({bookingColumn})
    }
    
    handleChangeForStartTimePicker(time1){
         this.setState({st: time1});
    }
              
    handleChangeForEndTimePicker(time){
        this.setState({et: time});
    }              
        
    handleChange(event){
      
            const target = event.target;   
            const value = target.value;
            const name = target.name;
        
            this.setState({
              [name]: value
            });
               
        }
            

        
    submitHandler(event){  
        
        const {st,et,purpose,nop,bookingMade,chosenDate,recurringEndDate,disableRecurring} =this.state;       
        
        const reservation = {
            userId:this.props.userId,
            dob: chosenDate,
            st: st,
            et: et,
            purpose:purpose,
            nop:nop,
            notrecurring:disableRecurring,
            recurringEndDate:recurringEndDate,
            isAdmin:this.props.isAdmin,
            responded:this.props.isAdmin?true:false
        }
        api.post(`/reservations`,reservation,{
            headers:{
                'Content-Type':'application/json'
            }
        });
 }
        
  
    toExcludeTimes(){ 
        const {excludeTimeArraySt,excludeTimeArrayEt} =this.state;
        finalArray = ExcludeTimeArray(this.state.chosenDate,dailyBookings(this.state.chosenDate,this.props.reservations))
            this.setState({
          excludeTimeArraySt : [...finalArray[0]],excludeTimeArrayEt:[...finalArray[1]]
          })     
    }
   
    render(){

        const {st,et,purpose,nop} =this.state;
        const { chosenDate, bookingMade} = this.state;
  
           
        return(
          
            <div>
                           
                <Tabs defaultActiveKey="CheckAvailability" id="uncontrolled-tab">
                <Tab eventKey="CheckAvailability" title="Check Availability">
                
                    <Schedule changed={bookingMade}/>
                </Tab>
                <Tab eventKey="MakeBooking" title="Make Booking">
                        <div className='MakeBookingWrapper'>
                            <div className="DatePicker">
                                <h5>1) Select a Date  :</h5>
                                <br/>
                                <DatePicker 
                                selected={chosenDate} 
                                onChange={this.handleChangeForChosenDate} 
                                className="form-control"/>
                            </div>
                            <div className="BookingTable">
                                <h5>2) Pick from available slots :</h5>   
                                <br/>
                                <BookingsColumn chosenDate={chosenDate} reservations={this.props.reservations}/> 
                            </div>
                            <div className="bookingForm">
                                <h5>3) Make Booking:</h5>   
                                <br/>
                                <form onSubmit={this.submitHandler} >
                                        <div className="row" >
                                            <div className="form-group col-md-6">
                                            <label className="col-form-label">Start Time</label>
                                            <DatePicker
                                                selected={st}
                                                name="st"
                                                onChange={this.handleChangeForStartTimePicker}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                autoComplete="off"
                                                className="form-control"
                                                excludeTimes={this.state.excludeTimeArraySt}
                                                minTime={setHours(setMinutes(chosenDate, 0), 8)}
                                                maxTime={setHours(setMinutes(chosenDate, 30), 20)}
                                                dateFormat="h:mm aa"
                                                />
                                            </div>
                                            <div className="form-group col-md-6">
                                            <label className="col-form-label">Stop Time</label>
                                            <DatePicker
                                                selected={et}
                                                name="et"
                                                onChange={this.handleChangeForEndTimePicker}
                                                showTimeSelect
                                                showTimeSelectOnly
                                                timeIntervals={30}
                                                timeCaption="Time"
                                                dateFormat="h:mm aa"
                                                className="form-control"
                                                autoComplete="off"
                                                excludeTimes={this.state.excludeTimeArrayEt}
                                                minTime={setHours(setMinutes(chosenDate, 30), 8)}
                                                maxTime={setHours(setMinutes(chosenDate, 0), 21)}
                                                autoComplete="off"
                                                />
                                        </div>
                                        </div> 
                                        
                                        <div className="form-row">
                                        <div className="form-group col-md-12">
                                            <label className="col-form-label">Number of Participants</label>
                                            <input className="form-control" placeholder="Number" 
                                                type="number"
                                                name="nop"
                                                value={nop}
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                        </div> 
                                    
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                                <label className="col-form-label">Purpose</label>
                                                <input className="form-control" placeholder="Purpose" 
                                                    type="text"
                                                    name="purpose"
                                                    value={purpose}
                                                    onChange={this.handleChange}
                                                />
                                            </div>   
                                        </div>
                                        
                                        {this.props.isAdmin && (
                                        <div>
                                        <div className="form-row">
                                            <div className="form-group col-md-12" onChange={(event) => this.onToggleRecurring(event.target.value)}>
                                            <label className="col-form-label">Booking Type</label>   
                                            <select className="form-control"name="recurring" defaultValue="none" onChange={(event) => this.onToggleRecurring(event.target.value)} >
                                                <option value="none">Non recurring</option>
                                                <option value="recurring">Recurring</option>                    
                                            </select>
                                            </div>   
                                        </div>
                                    
                                        <div className="form-row">
                                            <div className="form-group col-md-12">
                                            <label className="col-form-label">Recurring End Date</label>
                                                <DatePicker selected={this.state.recurringEndDate} disabled={this.state.disableRecurring} onChange={this.handleChangeForRecurringEndDate} className="form-control"/>
                                            </div>   
                                        </div>
                                        </div> )}


                                        <div className="form-row">
                                        <div className="form-group col-md-12">
                                                <button type="button" class="btn btn-secondary btn-block" data-toggle="modal" data-target="#bookingModal">
                                                    Book
                                                </button>

                                                
                                    
                                            <div className="modal fade" id="bookingModal" tabIndex="-1" role="dialog">
                                            <div className="modal-dialog" role="document">
                                                <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Booking Details</h5>
                                                    <button type="button" className="close" data-dismiss="modal" >
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                        <h6>Time Slot: <strong>{moment(st).format("h:mma")}</strong> to <strong>{moment(et).format("h:mma")}</strong></h6>
                                                        <h6>Number of Participants : {nop}</h6>
                                                        <h6>Purpose : {purpose}</h6>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="submit" className="btn btn-primary">Make Request</button>
                                                </div>
                                                </div>
                                            </div>
                                            </div>
                                    
                                </div>
                                         </div>        
                              </form>
                            </div>
                        </div>
                    </Tab>
                    </Tabs>
 
             </div>      
      )   
    }
}

export default MakeBooking; 

   
  
   
  
  

  
