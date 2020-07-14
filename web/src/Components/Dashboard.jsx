import React, {Component} from "react";
import ApprovalList from "./ApprovalList";
import "../css/Dashboard.css"
import Schedule from "./Schedule";
import UpcomingBookings from "./UpcomingBookings";
function Dashboard(){

    return <div className="main">
            
                <div>
                    <div className="row">
                    <Schedule/>
                    </div>
                    <div className="dashboard--columns">
                    <div className="container-fluid">

                    <ApprovalList />
                    </div>
                    <div className="container-fluid">

                    <UpcomingBookings />
                    </div>
                    </div>
                    
                </div>
         
        </div>

    
    
}
export default Dashboard;