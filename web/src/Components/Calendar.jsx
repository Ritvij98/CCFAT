import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import "../css/pdf-viewer.css";
import api from "../api/init";

class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null,
            calendar:null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.display = this.display.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myFile',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
       
        api.post("/calendar/upload",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }
    display(calendar){
        this.setState({calendar})
    }
    componentDidMount(){
        api.get("/calendar/display")
        .then((res)=>{
            console.log(res);
            this.display(res.data)
        })
    }
    render() {
        return (
           
<div className='col-sm-12 text-center'>
        <div className='border rounded'>
        <PDFViewer
            document={{
                file:this.state.calendar
            }}
            hideRotation
            css='customViewer'
            canvasCss='customCanvas'
            navigation={{
                css: {
                    navbarWrapper: 'customWrapper',
                    zoomOutBtn: 'customPrevBtn',
                    resetZoomBtn: 'customResetBtn',
                    zoomInBtn: 'customNextBtn',
                    previousPageBtn: 'customPrevBtn',
                    pageIndicator: 'customPages',
                    nextPageBtn: 'customNextBtn',
                    rotateLeftBtn: 'customPrevBtn',
                    resetRotationBtn: 'customResetBtn',
                    rotateRightBtn: 'customNextBtn',
                },
            }}
            />
        </div>
        
            {this.props.isAdmin && 
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" name="myFile" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>}

        </div>
    
    )
    }
    
    }
    
     

export default Calendar;