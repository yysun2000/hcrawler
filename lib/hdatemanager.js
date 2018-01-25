export class dateManager{
  constructor(){
    this.date = new Date();
    this.yyyymmdd = this.getYYYYMMDD();
    this.hhmmss = this.getHHMMSS();
    this.dbData = this.yyyymmdd + " " + this.hhmmss;
  }
  getYYYYMMDD(){
    var YYYYMMDD;
    var d = this.date;
    YYYYMMDD += d.getFullYear;
    YYYYMMDD += "-"+this.convertTwoChar(d.getMonth()+1)+"-";
    YYYYMMDD += this.convertTwoChar(d.getDate());
    return YYYYMMDD;
  }
  getHHMMSS(){
    var HHMMSS;
    var d = this.date;
    HHMMSS += this.convertTwoChar(d.getHours());
    HHMMSS += this.convertTwoChar(d.getMinutes());
    HHMMSS += this.convertTwoChar(d.getSeconds());
    return HHMMSS;
  }
  convertTwoChar(number){
    var string = number.toString();
    if(string.length == 1){
      string = "0"+string;
    }
    return string;
  }
}
