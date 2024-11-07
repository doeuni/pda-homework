import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

export default function StockApp() {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const getStock = async () => {
      const url = "http://localhost:5173/data/stock.json";
      const resp = await axios.get(url);
      setArr(resp.data);
    };
    getStock();
  }, []);
  useEffect(() => {
    console.log(arr);
  }, [arr]);

  return (
    <div>
      <h1>Stocks</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>날짜</th>
            <th>종가</th>
            <th>시가</th>
            <th>고가</th>
            <th>저가</th>
            <th>거래대금</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((e, i) => {
            return (
              <tr key={i}>
                <td>{e.date}</td>
                <td>{e.tradePrice}</td>
                <td>{e.openingPrice}</td>
                <td>{e.highPrice}</td>
                <td>{e.lowPrice}</td>
                <td>{e.candleAccTradePrice}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}
