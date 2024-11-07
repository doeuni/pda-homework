import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";

/**
 일까지 주별로 뉴스기사 수집하기 (주별로: (영업일 5일 / 1주) 1페이지: 총 3페이지) 
    - 저장 형태는 Object형태로 하시되 key는 끝나는 날짜, value는 array<object({title:기사제목, url: 기사링크})>로 저장하기
*/
async function main(){
    let result = []

    let start = [20241007000000, 20241014000000, 20241021000000]
    let end = [20241011235959, 20241018235959, 20241025235959]
    for (let i = 0 ; i <3 ; i ++){
        let result2 = []
        const res = await axios.get(`https://search.daum.net/search?w=news&cluster=y&q=%EC%82%BC%EC%84%B1%EC%A0%84%EC%9E%90&sd=${start[i]}&ed=${end[i]}&period=u&DA=STC`);
        const data = res.data;
        const $ = cheerio.load(data);
        const $title = $('.tit-g.clamp-g')
        // console.log($title);
        const $url = $title.map((i,e)=>{
            const tmp = $(e).text()
            const url = $(e).find('a').prop('href')
            result2.push({
                'title': tmp,
                'url': url
            })
        })
        // console.log(result2)
        // const endDate = end[i]

        // result[end[i].slice(0,4)]=result2;
        // result[end[i]]=result2;
        const formattedDate = end[i].toString().slice(0,8).replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
        result[formattedDate] = result2;
    
    // const tmp = {}
 } console.log(result)
   


    
    

    fs.writeFile("news.json", JSON.stringify(resultArr), err=>{
        if (err){
            console.error(err);
        }
    })

} 

main()