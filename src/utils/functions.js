const MONTHS2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS1 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
const MONTHS = ["jan.", "feb.", "mar.", "apr.", "may", "june", "july", "aug.", "sep.", "oct.", "nov.", "dec."];

export function getFormatedDate(date){

    date = new Date(date);
      let getTwoSymb = (str) => {
        str += "";
        str = str.length < 2 ? `0${str}`: str;
        return str;
      };

      let hrs_mnt_sec = [
        getTwoSymb( date.getHours() ),
        getTwoSymb( date.getMinutes() ),
        getTwoSymb( date.getSeconds() )
      ].join(":");

    let now = new Date();
    let diff = now - date;
    let str = '';

    let pm_or_am = date % (1000*3600*24) > 1000*3600*12 ? ' am': ' pm';

    if(diff > (3600*1000*24*364)){
        str = 'over a year ago...';
    }else if(diff > 3600*24*1000){
        str = `${MONTHS[date.getMonth()]} ${date.getDate()}`
    };

    
    return str || hrs_mnt_sec + pm_or_am;

}

export function getHoursMinutes (date) {
  date = new Date(date);
  let minutes = date.getMinutes();
  minutes = minutes > 9? minutes: '0' + minutes;
  let hours = date.getHours();
  hours = hours > 9? hours: '0' + hours;
  return hours + ':' + minutes;
}

export function getDateMonth (date) {
   date = new Date(date);
  let day = date.getDate();
  let month = MONTHS2[date.getMonth()];

  return month + ' ' + day;
}



export function fitImage (e) {
        let img = new Image();
        img.src = e.target.currentSrc;
        let width, height;
        if(true){
            width = e.currentTarget.parentElement.clientWidth;
            height = width * img.height/ img.width;
        }else if(img.width < this.state.widthMin){
            width = this.state.widthMin;
            height = this.state.widthMin * img.height / img.width;
        }else if(img.width < this.state.widthMax){
            width = img.width;
            height = img.height;
        }else{
            
            width = this.state.widthMax;
            height = this.state.widthMax * img.height / img.width;
        };

        this.setState({ width, height });

    };


