import mysql from "mysql";

const con = mysql.createConnection({
  host:'127.0.0.1',
  user:'root',
  password:'1234',
  database:'hmonitortest'
});

export function commit(){

}
