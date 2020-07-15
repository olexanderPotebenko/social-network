const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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

