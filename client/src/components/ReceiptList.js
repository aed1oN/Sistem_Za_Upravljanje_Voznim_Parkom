import React, { useState, useEffect } from "react";
import axios from "axios";
import Receipt from "./Receipt";

const ReceiptList = (props) => {
  const [receiptList, setReceiptList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/receipts")
      .then((response) => {
        setReceiptList(response.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div id="receipt-list">
      {receiptList.map((receipt) => {
        return (
          <Receipt
            key={receipt.id}
            value={receipt}
            setReceiptList={setReceiptList}
            showButtons={props.showButtons}
          />
        );
      })}
    </div>
  );
};

export default ReceiptList;
