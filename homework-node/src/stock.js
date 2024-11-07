import axios from "axios";
import fs from "fs";
/**
삼성전자  주봉(3개)가져와서 json으로 저장하기.
json에 들어갈 필수 key
[date, tradePrice(종가), openingPrice, highPrice, lowPrice, candleAccTradePrice(거래대금)]
*/
async function main() {
    const url = await fetch("https://finance.daum.net/api/charts/A005930/weeks?limit=5&adjusted=true", {
        "headers": {
          "accept": "application/json, text/plain, */*",
          "accept-language": "ko,en;q=0.9,en-US;q=0.8",
          "priority": "u=1, i",
          "sec-ch-ua": "\"Chromium\";v=\"130\", \"Microsoft Edge\";v=\"130\", \"Not?A_Brand\";v=\"99\"",
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": "\"Windows\"",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "cookie": "webid=868565675a174f01b4e03777e8ac50d7; webid_ts=1725340448808; __gads=ID=b2cb4217251b2165:T=1729145847:RT=1730072108:S=ALNI_MaamL0_fVZsstf214nn38z0yeZUcQ; __gpi=UID=00000f469a5c385c:T=1729145847:RT=1730072108:S=ALNI_MZA3_Nj1XOfIIajGAsqp0UDWvhOMQ; __eoi=ID=594ccf6ae04ae1fd:T=1729145847:RT=1730072108:S=AA-AfjZoVYTVryjKiCYQaVQ7-COf; recentMenus=[{%22destination%22:%22chart%22%2C%22title%22:%22%EC%B0%A8%ED%8A%B8%22}]; KAKAO_STOCK_CHART_ENABLED_INDICATORS=[%22sma%22%2C%22column%22]; KAKAO_STOCK_RECENT=[%22A005930%22]; _T_ANO=eCoRD4UuivFp9uz2cdr649fZZPAUGTGI/i0/s7gAuVZciDE5U4ZiYeb+uGzTIDX8g0MefS/e9nf/w53XMRrh/QUgjYPBLO4VwCR7pIouCR5FrcLfVdwMiqEeeHfqHJDeT0p5E7tZQmTrj/y+PEdm4z4tbmCoThE8MTMiZ3pnAqKjuM+129WHjt+rCK2NskLugpiyvxNWeIlkk8d7/TbTBcbHWR3mXC6P60OCbC01OrzZS7iD6bIG10yvf9JlhsHuIC5f8Ur6tGJoNSLZPOFnaQ18+RKl4p/Q1uHIK295pjwj8lXpajbQEYHckEIVl4Og6WRJYPPqnB2OOChRU+Ss6A==; webid_sync=1730979273062",
          "Referer": "https://finance.daum.net/quotes/A005930",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
      });
      
    const data = await url.json()
    const stockData = data.data.slice(0, 3).map(item => ({
      date: item.date,
      tradePrice: item.tradePrice,
      openingPrice: item.openingPrice,
      highPrice: item.highPrice,
      lowPrice: item.lowPrice,
      candleAccTradePrice: item.candleAccTradePrice
  }));


  fs.writeFile("stock.json", JSON.stringify(stockData, null, 2), err => {
      if (err) {
          console.error(err);
          return;
      }
      
  });
}
main();
