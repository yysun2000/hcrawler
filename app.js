/*

1. 프로그램 설명 : 타 사이트를 크롤링하여 정보를 추출하는 NodeJS 기반의 프로그램입니다.

*/

import express from "express";
import http from "http";
import fs from "fs";
import * as hcrawler from "./lib/hcrawler.js"
import * as hdatamanager from "./lib/hdatamanager.js"

const app = express();

/* 크롤러 설정 */

const crawler = hcrawler.crawler;
const jquerylize = hcrawler.jquerylize;
const extract = hcrawler.extract;
const output = hcrawler.output;



const naver = {
  url : "https://search.shopping.naver.com/best100v2/main.nhn",
  server : {
    uri : "/naver",
    encoding : null
  },
  query : "#popular_srch_lst > li .txt",
  callback : function(data){
    return {
      link : "https://search.shopping.naver.com/search/all.nhn?query="+encodeURI(data.text())+"&cat_id=&frm=NVSHATC",
      name : data.text()
    }
  }
}

app.use(express.static('./')); // 서버의 경로를 NodeJS 실행된 경로로 설정한다.

app.listen(7005,(req,res) => {

  server(naver)
    .then(crawler)
    .then(jquerylize)
    .then(extract)
    .then(output)
    .then(response);
});



/*
  설명 : 서버를 설정함.
*/
const server = (data) => new Promise((resolve,reject) => {
  console.log("server");
  app.get(data.server.uri,(req,res) => { // Express의 get을 이용함.
    data.server.res = res; // 서버의 응답 객체를 사용하기 위해 객체에 저장.
    resolve(data);
  })
})


const response = function(data){
  data.server.res.send(data.result);
}
