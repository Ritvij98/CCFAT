import React, { Component } from "react";
import "../../css/Records.css";

import TableRow from "./TableRow.jsx";

class Table extends Component{

constructor(props){
    super(props);
  
}

render(){
if(!this.props.array){return(<h3>Loading...</h3>)}
const rows=this.props.array.map(value=>{
  
    return <TableRow 
                key = {value._id}
                id = {value._id}
                tabName={this.props.tabName}
                data={value}
                header={false}
                headerRow={this.props.headerRow}
                changeRenderRecordStateFunc={this.props.changeRenderRecordStateFunc}

                />

});
    return(
        <div className="table-responsive d-flex justify-content-around bd-highlight">
        <table className="table table-hover ">
        <thead className="thead-light">
           <TableRow 
           header={true}
           headerRow={this.props.headerRow}
           data={this.props.array[0]}
           changeRenderRecordStateFunc={this.props.changeRenderRecordStateFunc}

           />
           

        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
    </div>
    )
    }
}

export default Table;