
import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from "./RecordsTabsComponents/table";
import "../css/Records.css"
import RecordsHeader from "./RecordsTabsComponents/RecordsHeader";
import RecordData from "./RecordData";
import api from "../api/init"
const axios = require('axios').default;
const Loading = require('react-loading-animation')

const userHeaders={
    "Name":"name",
    "Department":"department",
    "Institute":"institute",
    "Email":"email",
    "Creation Date":"createdAt"
}
const deptHeaders={
    "Name":"name",
    "Institute":"institute",
    "Creation Date":"createdAt"
}
const instiHeaders={
    "Name":"name",
    "Creation Date":"createdAt"
}


class Records extends Component{
    constructor(props){
        super(props);
        this.state={
            renderRecordData:false,
            userList:null,
            deptList:null,
            instiList:null,
            renderRecord:false,
            recordID:null,
            tabName:null,
            listDataFromChild:'',
            updateRender:false,
            term:null
               
        }
        this.setRecords1= this.setRecords1.bind(this);
        this.setRecords2= this.setRecords2.bind(this);
        this.setRenderRecordData=this.setRenderRecordData.bind(this);
        this.setRenderRecord=this.setRenderRecord.bind(this);
        this.setUpdateRender = this.setUpdateRender.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
 
    }
   
       
    setRenderRecordData(recordID,tabName){
      
        this.setState({
            renderRecordData: !this.state.renderRecordData,recordID,tabName
        })
       
        
    }
   
    setRenderRecord(){
        this.setState({
            renderRecord: !this.state.renderRecord
        })
    }
    
    setRecords1(userList){   
        this.setState({
            userList
        });
      
    }
    
    setRecords2(deptList){   
        this.setState({
            deptList
        });
    }
    
    setRecords3(instiList){   
        this.setState({
            instiList
        });
    }

    setUpdateRender(){
        this.setState({
            updateRender:!this.state.updateRender
        })
    }
    
    componentDidMount(){

        Promise.all([
            api.get('/records/users'),
            api.get('/records/departments'),
            api.get('/records/institutes')  
        ])
          .then(([userList, deptList, instiList]) => {
            this.setRecords1(userList.data);
            this.setRecords2(deptList.data);
            this.setRecords3(instiList.data);
            this.setRenderRecord();
          
          })
           .catch(error => console.log(error));
   }
    
    // componentDidUpdate(prevProps,prevState){
        
    //      fetch(`http://localhost:3002/records/users`)
    //     .then(response=>response.json())
    //     .then(userList=>this.setRecords1(userList))
    //     .catch(error=>error)
       
    //     if(prevState.updateRender!==this.state.updateRender){    

    //         this.render()
    //       }
    //    }
    //    if(prevState.deptList!==this.state.deptList){    

    //     fetch(`http://localhost:3002/records/departments`)
    //     .then(response2=>response2.json())
    //     .then(deptList=>this.setRecords2(deptList))
    //     .catch(error=>error)
    
    //    }
    //    if(prevState.instiList!==this.state.instiList){
    //     fetch(`http://localhost:3002/records/institutes`)
    //     .then(response=>response.json())
    //     .then(instiList=>{this.setRecords3(instiList)})
    //     .catch(error=>error)   
     
        
    
    // }
    onSearchHandler = e => {
        this.setState({
          term: e.target.value
        })
      };
     
    
    render(){
 
    
      const {userList,deptList,instiList,renderRecord,listDataFromChild,renderRecordData,recordID,tabName} = this.state;   
    
    if(renderRecordData!==false){
         return(
            <div>
            <RecordData 
            recordID={recordID}
            tabName={tabName}
            changeRenderRecordStateFunc={this.setRenderRecordData}
            />
            </div>
        )
    }      
    

    else{
    if(renderRecord===false){ 
        return  (
         <div className="loading_animation">
            <Loading />
         </div>
         
        )}    
    return(
            <div> 
               
                <Tabs defaultActiveKey="Users" id="uncontrolled-tab-records">
                
                <Tab eventKey="Users" title="Users">
                    <div className="row">
                        <div className="col-md-9">
                        <RecordsHeader name="Users" insti={instiList} depts={deptList} rerender={this.setUpdateRender}/>
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
                {this.state.term?
                <Table tabName="Users"
                      headerRow={userHeaders}
                      array={userList
                        .filter(record => {
                          return (record.name === this.state.term)||
                          (record.department === this.state.term)||
                          (record.institute === this.state.term);
                        })}
                      changeRenderRecordStateFunc={this.setRenderRecordData}
            
                     />:

                <Table tabName="Users"
                    headerRow={userHeaders}
                    array={userList}
                    changeRenderRecordStateFunc={this.setRenderRecordData}

                />
                }
               
                </Tab>
              
           
                <Tab eventKey="Departments" title="Departments">
                <div className="row">
                        <div className="col-md-9">
                        <RecordsHeader name="Departments" insti={instiList} rerender={this.setUpdateRender}/>
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
                 {this.state.term?
                <Table tabName="Departments"
                      headerRow={deptHeaders}
                      array={deptList
                        .filter(record => {
                          return (record.name === this.state.term)||
                          (record.institute === this.state.term);
                        })}
                    changeRenderRecordStateFunc={this.setRenderRecordData}
            
                     />:

                 <Table 
                    tabName="Departments"
                    headerRow={deptHeaders}
                    array={deptList}
                    changeRenderRecordStateFunc={this.setRenderRecordData}
                /> 
                }
               
                </Tab>
                
                <Tab eventKey="Institutes" title="Institutes">
                <div className="row">
                        <div className="col-md-9">
                    
                         <RecordsHeader name="Institutes" rerender={this.setRerender}/>
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
                 {this.state.term?
                <Table tabName="Institutes"
                      headerRow={instiHeaders}
                      array={instiList
                        .filter(record => {
                          return (record.name === this.state.term);
                        })}
                    changeRenderRecordStateFunc={this.setRenderRecordData}
            
                     />:
                <Table tabName="Institutes"
                headerRow={instiHeaders}
                array={instiList}
                changeRenderRecordStateFunc={this.setRenderRecordData}
                /> 
                
                }
               
                </Tab> 

                </Tabs>

            </div>
        )
    }
    }
}
export default Records;