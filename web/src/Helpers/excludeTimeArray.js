import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import moment from "moment";
const ExcludeTimeArray = (chosenDate,a) => {
    
    let a1=[];
    let a2=[];
    a.map((a)=>{
     
        for(var i=moment(a.st);i.isBefore(moment(a.et),'minute');i=i.add(30,'minutes'))
         {          
            if(i.minute()===30){
                a1.push(setHours(setMinutes(chosenDate, 30), i.hour())); 
            }else if(moment(i).minute()===0){
                a1.push(setHours(setMinutes(chosenDate, 0),  i.hour()));
            }
    
         }

        for(var i=moment(a.st).add(30,'minutes');i.isSameOrBefore(moment(a.et),'minute');i=i.add(30,'minutes'))
        { 
         
            if(i.minute()===30){
                a2.push(setHours(setMinutes(chosenDate, 30), i.hour())); 
            }else if(moment(i).minute()===0){
                a2.push(setHours(setMinutes(chosenDate, 0),  i.hour()));
            }
            
        }
   })

    return [[...a1],[...a2]]

}

export {ExcludeTimeArray};