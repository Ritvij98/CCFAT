import React, {Component} from "react";
import "../css/Dashboard.css";
import moment from "moment";
import api from "../api/init";

class ApprovalList extends Component{
constructor(props){
    super(props)
    this.state={
        ToApprove:[],
        rerender:false
    };
    this.updateApproveList = this.updateApproveList.bind(this);

}

  updateApproveList(value,index,decision){
 
      api.put(`http://localhost:3002/reservations/${value}/${decision}`,{_id:value},{
      headers:{
          'Content-Type':'application/json'
      }
  });
    this.state.ToApprove.splice(index,1);
    this.setState({
      ToApprove: this.state.ToApprove
  })
 }
   
 
    componentDidMount(){
        api.get(`/reservations/approvallist`)
        .then(res=> this.setState({ToApprove: res.data}))
        .catch(error=>error)
    }

    render(){
        const {ToApprove}=this.state
        const waitingList=ToApprove
        .map((value,index)=>{
          return (
               
                    
                    <div className="waiting-booking" key={value._id}>
         
                      <dl className="mt-2">
                        
                          <dt>Name</dt>
                          <dd>
                            {value.user.name}
                          </dd>
                          <dt>Dept</dt>
                          <dd>
                          {value.user.department}
                          </dd>
                          <dt>Institute</dt>
                          <dd>
                          {value.user.institute}
                          </dd>
                          <dt>Date</dt>
                          <dd>
                            {moment(value.dob).format("DD/MM/YY")}
                          </dd>
                          <dt>Time Slot</dt>
                          <dd>
                          <strong>{moment(value.st).format("h:mma")}</strong> to <strong>{moment(value.et).format("h:mma")} </strong> 
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
                      <div className="waitlist-buttons"> 
                        <button className="btn btn-outline btn-secondary mr-1" 
                        onClick={this.updateApproveList.bind(this,value._id,index,true)}>Approve</button>
                        <button className="btn btn-outline btn-secondary" 
                        onClick={this.updateApproveList.bind(this,value._id,index,false)}>Decline</button>
                      </div> 
                    </div>  
                
          )
        });
       
       
        if (!this.state.ToApprove) 
        { return <h1>loading...</h1>; }
      
        return(
    
                <div className="wait-list">
                 <h4>Waiting For Approval</h4> 
                    {waitingList}
                </div>
          
       )
    }
    
}       
 
export default ApprovalList;
