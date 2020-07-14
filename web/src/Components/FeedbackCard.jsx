import React from "react";


function FeedbackCard(){
    return  <div className="feedbackCard"> 
        <div>
            <h5>We would like your feedback to improve our website.</h5>
            <br/>
            <h5>What is your opinion of the page ?</h5>
            
            <form className="">
            <button className="btn"><i className="far fa-tired fa-3x"></i></button>
            <button className="btn"><i className="far fa-frown fa-3x"></i></button>
            <button className="btn"><i className="far fa-meh fa-3x"></i></button>
            <button className="btn"><i className="far fa-smile fa-3x"></i></button>
            <button className="btn"><i className="far fa-laugh-beam fa-3x"></i></button>
                <hr/>
                <h6 style={{textAlign:"left"}}>Please Select your feedback category below :</h6>
                <button className="btn btn-outline-dark">Suggestion</button>
                <button className="btn btn-outline-dark">Something is not quite right.</button>
                <button className="btn btn-outline-dark">Compliment</button>
                <h6 style={{textAlign:"left"}}>Give us your feedback :</h6>
                <textarea className="form-control" style={{borderColor:"grey"}}></textarea>
                <button className="btn btn-dark">Submit</button>
            </form>
        </div>    
        
    </div> 
    
}
export default FeedbackCard;