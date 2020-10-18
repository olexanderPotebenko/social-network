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


