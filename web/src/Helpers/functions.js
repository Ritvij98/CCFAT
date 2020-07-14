
import moment from 'moment';

const dailyBookings = (currentDate, roomBookings) => {
  if(roomBookings){
  const filteredBookings = roomBookings.filter(
      (booking) =>(((moment(booking.dob).format('YYYY-MM-DD') === moment(currentDate).format('YYYY-MM-DD'))&&booking.recurringEndDate===null)
      )
      ) 
           
         // (booking.recurringEndDate!==null && (moment(currentDate).isBefore(booking.recurringEndDate,'day')&&moment(currentDate).isSameOrAfter(booking.dob,'day')))
          
  const filterRecurring = roomBookings.filter(
     (booking)=>{
                if(booking.recurringEndDate!==null && (moment(currentDate).isSameOrBefore(booking.recurringEndDate,'day')&&moment(currentDate).isSameOrAfter(booking.dob,'day'))){
                var index = moment(currentDate).diff(booking.dob,'days')
                if(booking.recurring[index]===1){
               return booking
              }
           }
        }
   )   
   return [...filteredBookings,...filterRecurring]
  }
    
  return []  
    
  }
  
 
  
  const bookingArray = (filteredBookings) => {
 
    let dayHours = [...Array(24).keys()]
  
    filteredBookings.forEach(booking => {
      

      let startTime = Number(moment(booking.st).format("HH.mm"));
      let finalHour = Number(moment(booking.et).format("HH.mm"));      
      let duration = finalHour - startTime;
      
     for (let i = Math.floor(startTime); i < Math.ceil(finalHour); i++) {
       
        let bookingData = Object.assign({}, booking)

         
      if (duration === 0.3 && startTime % 1 !== 0) {
        bookingData.secondHalfHour = true
      
      } else if (duration === 0.3 && startTime % 1 === 0) {
        bookingData.firstHalfHour = true
       
      } else {
      
        if (i === Math.floor(startTime) && startTime % 1 !== 0) {
          bookingData.secondHalfHour = true
        }
       
        if (i === Math.ceil(finalHour - 1) && finalHour % 1 !== 0) {
          bookingData.firstHalfHour = true
        }
      }
 
        
   

  
       
        dayHours[i] = typeof dayHours[i] == 'number' ? 
                        bookingData :
                        [dayHours[i], bookingData]
      }
    })
  
 
    return dayHours
  }

  export {dailyBookings, bookingArray }