import React, { Component } from "react";
import "../css/LoginPage.css";
import Schedule from "../Components/Schedule";
import api from "../api/init";
import Loading from "react-loading-animation";


class LoginPage extends Component{

    constructor(props){
       super(props)
       
      this.state={
            instituteList:null,
            departmentList:null
        }    
        this.onInstituteSelect = this.onInstituteSelect.bind(this)
    }
    
    onInstituteSelect(event){
      api.get(`/records/departments/${event.target.value}`)
        .then((res) => {
            this.setState({
                departmentList:res.data.map((x)=>{return x.name})});
        })
        .catch(error => console.log(error));
    }

    componentDidMount(){
        api.get('/records/institutes')
        .then((res) => {
            this.setState({
                instituteList:res.data.map((x)=>{return x.name})});
        })
        .catch(error => console.log(error));
    }

    render(){
        if(!this.state.instituteList){
            return(
                <Loading />
            )
        }
         return(
            <div style={{backgroundColor:"#ececec"}} >
                <form  onSubmit={event => {
                    event.preventDefault();
                    const elements = event.target.elements;
                    const email = elements.email.value;
                    const password = elements.password.value;
                    this.props.onSignIn({ email, password })
                }}>  
                    <div className="d-flex" style={{backgroundColor:"#30475e",padding:"1rem", margin:"0"}}>
                        <div className="mr-auto p-2" >
                            <h1 style={{color:"#ececec"}}>CCFAT</h1>
                            <h4 style={{color:"#ececec"}}>Central Computing Facility Automation Tool</h4>
                        </div>
                
                    <div className="p-2 col-4">
                        <div className="form-group col-12 ">
                            <div className="">
                            <input className="form-control" type="email" name="email" placeholder="Email" />
                            </div>
                        </div>
                        <div className="form-group col-12">
                            <div className="">
                            <input className="form-control" type="password" name="password" placeholder="Password" />
                            </div>
                        </div>
                    </div>
                    
                    
                    <div className="p-2 d-flex flex-column">
                        <button className="p-2 btn btn-light mb-2">Log In</button>
                        <a data-toggle="modal" data-target="#signupModal">
                        <button className="p-2 btn btn-secondary">
                    {/* <span className="fa fa-sign-in"></span>   */}
                           Sign Up
                        </button> 
                        </a>  
                    </div>
                    </div> 
                
                </form>

                <div className="row justify-content-center"> 
                <div className="col-md-10 ">
                <Schedule />
                </div>
                </div>
              
                <form
                onSubmit={event => {
                
                const elements = event.target.elements;
                const email = elements.email.value;
                const name = elements.name.value;
                const department = elements.department.value;
                const institute = elements.institute.value;
                const password = elements.password.value;
                this.props.onSignUp({ name, department, institute, email, password });
                alert("Registered Successfully.")
                 }}
                 >

             
                
                     <div id="signupModal" className="modal fade" role="dialog">
                            <div className="modal-dialog modal-md" role="content">
                                <div className="modal-content">

                                    <div className="modal-header">
                                    <h4 className="modal-title">Sign Up </h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>

                                    <div className="modal-body">
                           
                                            
                                                <div className="form-group">
                                                        <label className="sr-only">Name</label>
                                                        <input type="text" className="form-control  mr-1" name="name" placeholder="Enter Your Full Name" />
                                                </div>
                                                <div className="form-group ">
                                                        <label className="sr-only">Institute</label>
                                                        <select defaultValue={'DEFAULT'} className="form-control" name="institute" onChange={this.onInstituteSelect}>
                                                        <option value="DEFAULT" disabled>Choose an Institute ...</option>
                                                            {this.state.instituteList.map((x,index) => {
                                                            return <option key={index} value={x}>{x}</option>
                                                            })}
                                                        </select>
                                                            
                                                </div>
                                                <div className="form-group ">
                                                        <label className="sr-only">Department</label>
                                                        <select defaultValue={'DEFAULT'} className="form-control" name="department"  >
                                                        <option value="DEFAULT" disabled>Choose an Department ...</option>
                                                            {this.state.departmentList && this.state.departmentList.map((x,index) => {
                                                            return <option key={index} value={x}>{x}</option>
                                                            })}
                                                        </select>
                                                        
                                                </div>
                                                <div className="form-group ">
                                                        <label className="sr-only">Email address</label>
                                                        <input type="email" className="form-control  mr-1" name="email" placeholder="Enter email" />
                                                </div>
                                                <div className="form-group">
                                                    <label className="sr-only">Password</label>
                                                    <input type="password" className="form-control " name="password" placeholder="Password" />
                                                </div>
                                                
                                            <div className="form-row justify-content-center">
                                                <button type="button" className="btn btn-secondary " data-dismiss="modal">Cancel</button>
                                                <button type="submit" className="btn btn-primary ml-1" >Sign in</button>        
                                            </div>
                                
                                </div>
                
                            </div>

                         </div>

                    </div>
            
                  
               </form>

            
            </div> 
         
        )  
    }
          
                
    
}
export default LoginPage ;