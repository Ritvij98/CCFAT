import React, { Component } from "react";
import TableCell from "./TableCell";
import moment from "moment";

class TableRow extends Component{
    constructor(props){
        super(props);
        this.state={
            rowMarkup:null
        }
      
    }
    handleClick(id,tabName){
          this.props.changeRenderRecordStateFunc(id,tabName);
     }
       
    render(){

    var {rowMarkup}=this.state
    const {headerRow,header,data} =this.props;

    rowMarkup = Object.keys(headerRow).map((value,index)=>{
        return(      
                <TableCell
                key ={index} 
                content={header?value:(value=="Creation Date"?moment(data[headerRow[value]]).format("DD/MM/YY"):data[headerRow[value]])}
                header={header}
                /> 
                )  
    })

    return (
        
    <tr onClick={header?'':this.handleClick.bind(this,this.props.id,this.props.tabName)} className="d-flex flex-row bd-highlight">
       {rowMarkup}
    </tr>
    
        )
    }
}

export default TableRow;