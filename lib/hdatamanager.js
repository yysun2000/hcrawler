import mysql from "mysql";
import datemanager from "hdatemanager"
const con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'1234',
  database:'testo'
});

export function commit(data){
  return new Promise((resolve,reject) => {
      var currentDate = new datemanager();
      var test = [["A",currentDate.dbData],["b",currentDate.dbData],["c",currentDate.dbData]];
      var sql = "insert into test1(name,date) values ?"
      con.query(sql,[test],function(err,result){
        if(!err) console.log(err);
        console.log(result);
      })
      //resolve(data);
  })
}
