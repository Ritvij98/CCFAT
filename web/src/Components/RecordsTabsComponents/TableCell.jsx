import React, { Component } from "react";

class TableCell extends Component{
    constructor(props){
        super(props)
    }
 
    render(){
    return(
        this.props.header ? (
        <th  scope="col" className="p-12 flex-fill bd-highlight" >
            {this.props.content}
        </th> 
        ) : (
        <td className="p-2 flex-fill bd-highlight" >
            {this.props.content}
        </td>
        )
    )
    }
}

export default TableCell;