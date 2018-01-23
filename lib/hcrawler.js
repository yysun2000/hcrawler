import request from "request";
import cheerio from "cheerio";
import iconv1 from "iconv";
import schedule from "node-schedule";

const Iconv1 = iconv1.Iconv;



export function crawler(data){
  /*
    설명 : 크롤러를 설정함.
  */
  console.log("crawler");
  return new Promise((resolve,reject) => {
    request({uri:data.url,encoding:null},(err,res,html) => {
      if(!err){
        data.html = html;
        resolve(data);
      }else{
        reject(data);
      }
    })
  })
}

export function jquerylize(data){
  /*
    설명
    1) 데이터를 엔코딩
    2) 객체를 jquery화 시킴
  */
  console.log("jquerylize");
  return new Promise((resolve,reject) => {
    let html = data.html; // HTML 버퍼
    let encoding = data.server.encoding; // 엔코딩 타입

    let buffer = new Buffer(html,'binary'); // 1. 버퍼 생성

    if(encoding == "euc-kr"){ // 2. EUC-KR인 경우
      iconv = new Iconv1('euc-kr', 'utf-8//translit//ignore'); // 2-1. euc-kr를 사용하기 위해 iconv를 설정.
      html = iconv.convert(buffer).toString('utf-8'); // 2-2. iconv를 통해서 버퍼를 euc-kr로 변환.
    }
    data.selector = cheerio.load(buffer); //3. cheerio를 통해 jquery객체로 변환
    resolve(data);
  })
}

export function extract(data){
  /*
  설명 : 데이터를 추출 후, 콜백에 보냄.
  */
  console.log("extract");
  return new Promise((resolve,reject) =>{
    let $ = data.selector;
    let result = [];
    var d = data;
    $(data.query).each(function(idx){
      var currentData = $(this);
      result.push(d.callback(currentData));
    });
    data.result = result;
    resolve(data);
  })
}

export function output(data){
  return new Promise((resolve,reject)=>{
      console.log(data.result);
      resolve(data);
  })
}
