import React, { Component } from "react";
import "../../css/Records.css";
import api from "../../api/init";
import Loading from "react-loading-animation";

class RecordsHeader extends Component{
    constructor(props) {
        super(props)
        this.state = {
            institute:'',
            department:'',
            name: '',
            email: '',
            instituteList:null,
            departmentList:null
         }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onInstituteSelect = this.onInstituteSelect.bind(this);
    }

    onInstituteSelect(event){
        this.handleChange(event)
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
  
    handleChange(event){
        const value = event.target.value;
        const name = event.target.name;
        this.setState({
        [name]: value
        });
    }
 
    handleSubmit(event){
        
        const { name, department, institute, email} = this.state;
 
        if(this.props.name === "Users"){
                var data = {
                    name: name,
                    department: department,
                    institute: institute,
                    email: email
                }
              
        }else if(this.props.name === "Departments"){
                var data = {
                    name: name,
                    institute: institute
                }
       
        }else if(this.props.name === "Institutes"){
                var data = {
                    name: name
                }
                
        }
          
        api.post(`/records/${this.props.name.toLowerCase()}`,data,{
           headers:{
                    'Content-Type':'application/json'
            }
            });
        
        this.props.rerender() ;
    }

    render(){
        if(!this.state.instituteList){
            return(
                <Loading />
            )
        }
    
        
        const { name, department, institute, email} = this.state;

            if(this.props.name === "Users")
                return(
                    <div className="users__route--header">
                                
                        <h1>{this.props.name}</h1>
                        <div className="users__route--tools">
                        
                                                    
                        <button type="button" className="btn btn-secondary addRecord" data-toggle="modal" data-target="#exampleModal">
                        + Add {this.props.name}
                        </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">New User</h5>
                                    <button type="button" className="close" data-dismiss="modal">
                                    <span>&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="inst" className="col-form-label">Institute</label>
                                        <select defaultValue={'DEFAULT'} 
                                        id="inst"
                                        className="form-control" 
                                        name="institute" 
                                        onChange= {this.onInstituteSelect}>
                                            <option value="DEFAULT" disabled>Choose an Institute ...</option>
                                                {this.state.instituteList.map((x,index) => {
                                                return <option key={index} value={x}>{x}</option>
                                                })}
                                        </select>
                                        </div>
                                    <div className="form-group">
                                        <label htmlFor="dept" className="col-form-label">Department</label>
                                        <select defaultValue={'DEFAULT'} 
                                        className="form-control" 
                                        name="department"  
                                        id="dept"
                                        onChange = {this.handleChange}
                                        >
                                            <option value="DEFAULT" disabled>Choose an Department ...</option>
                                                {this.state.departmentList && this.state.departmentList.map((x,index) => {
                                                return <option key={index} value={x}>{x}</option>
                                                })}
                                        </select>
                                    
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="name" className="col-form-label">Name</label>
                                        <input type="text" className="form-control"  id="name"
                                            name = "name"
                                            value = {name}
                                            onChange = {this.handleChange}
                                        
                                        />
                                    
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="emai"  className="col-form-label">Email</label>
                                        <input type="email" className="form-control"  id="emai"
                                            name = "email"
                                            value = {email}
                                            onChange = {this.handleChange}
                                            
                                        />
                                    
                                    </div>
                                
                                
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                
                                    <input type="submit" className="btn btn-primary" value='Submit' />
            
                                    </div> 
                                    </form> 
                                </div>
                                </div>
                            </div>
                            </div>
                        
                            
                        </div>
                            
                    </div>
                    )
            else if(this.props.name === "Departments")
                return(
                    <div className="users__route--header">
                                
                            <h1>{this.props.name}</h1>
                            <div className="users__route--tools">

                                            
                                <button type="button" className="btn btn-secondary addRecord" data-toggle="modal" data-target="#exampleModal2">
                                + Add {this.props.name}
                                </button>

                                <div className="modal fade" id="exampleModal2" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">New Department</h5>
                                        <button type="button" className="close" data-dismiss="modal">
                                        <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="inst" className="col-form-label">Institute</label>
                                            <select className="form-control" id="inst"
                                            type="text"
                                            name="institute"
                                            value={institute}
                                            onChange={this.handleChange}>
                                            {this.props.insti.map((x) => {
                                               return <option>{x.name}</option>
                                                })
                                            }
                                            
                                            </select>
                                            </div>

                                        <div className="form-group">
                                            <label htmlFor="name" className="col-form-label">Department Name</label>
                                            <input type="text" className="form-control"  id="name"
                                                name = "name"
                                                value = {name}
                                                onChange = {this.handleChange}
                                            
                                            />
                                        </div>
                                    
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    
                                        <input type="submit" className="btn btn-primary" value='submit' />
                                        </div> 
                                        </form> 
                                    </div>
                                    </div>
                                </div>
                                </div>
                            
                            </div>
                    
                        </div>
                    )
            else if(this.props.name === "Institutes")
                return(
                     <div className="users__route--header">
                                
                            <h1>{this.props.name}</h1>
                            <div className="users__route--tools">

                                            
                                <button type="button" className="btn btn-secondary addRecord" data-toggle="modal" data-target="#exampleModal3">
                                + Add {this.props.name}
                                </button>

                                <div className="modal fade" id="exampleModal3" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">New Institute</h5>
                                        <button type="button" className="close" data-dismiss="modal">
                                        <span>&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={this.handleSubmit}>
                                        
                                        <div className="form-group">
                                            <label htmlFor="name" className="col-form-label">Institute Name</label>
                                            <input type="text" className="form-control"  id="name"
                                                name = "name"
                                                value = {name}
                                                onChange = {this.handleChange}
                                            
                                            />
                                        
                                        </div>
                                                                    
                                        <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    
                                        <input type="submit" className="btn btn-primary" value='submit' />
                                        </div> 
                                        </form> 
                                    </div>
                                    </div>
                                </div>
                                </div>
                            
                               
                            </div>
                    
                        </div>  
                    ) 
                        
   }
}
export default RecordsHeader;