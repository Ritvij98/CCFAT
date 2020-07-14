import React, {Component} from "react";
import "../css/Dashboard.css";
import moment from "moment";
import api from "../api/init";

class UpcomingBookings extends Component{
    constructor(props){
        super(props)
        this.state={
            upcoming:[]
        };
        
    }
    
    setToApprove(result){
        this.setState({
            upcoming: result.filter((value)=>{
              return value.approvalStatus===true
            })
        })
    }
    componentDidMount(){
      api.get(`/reservations`)
      .then(result=>this.setToApprove(result.data))
      .catch(error=>error)
  }
    render(){
      const {upcoming}=this.state
        const waitingList=upcoming.map((value,index)=>{
          return(
            <div className="waiting-booking">
            
            
            <dl>
                
                <br />
                <dt>Date</dt>
                <dd>
                {moment(value.dob).format("DD/MM/YY")}
                </dd>
                <dt>Time Slot</dt>
                <dd>
                <strong>{moment(value.st).format("h:mma")}</strong> to <strong>{moment(value.et).format("h:mma")}</strong> 
                </dd>
                <dt>No. of participants</dt>
                <dd>
                  {value.nop}
                </dd>
                <dt>Purpose</dt>
                <dd>
                  {value.purpose}
                </dd>
              </dl>  
          </div> 
          )
        })
          if (!this.state.upcoming) 
          { return <h5>loading...</h5>; }
        
          return(
  
                
                     
                  <div className="wait-list">
                   <h4>Upcoming Reservations</h4> 
                      {waitingList}
                  </div>
               
                 
         ) 
     
                   
          
         
    }
}
 export default UpcomingBookings;