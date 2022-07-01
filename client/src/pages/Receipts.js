import React, { useState } from "react";
import { AiOutlineFileAdd, AiOutlineFileText } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import ReceiptList from "../components/ReceiptList";

const Receipts = () => {
  const navigate = useNavigate();

  const [showSearchFilter, setShowSearchFilter] = useState(false);

  return (
    <div>
      <div className="info-and-buttons">
        <h2>Lista naloga</h2>
        <div>
          <Button
            text="Izvještaj"
            icon={AiOutlineFileText()}
            color="Olive"
            marginRight="2em"
            onClick={() => setShowSearchFilter(!showSearchFilter)}
          />
          <Button
            text="Dodaj novi nalog"
            icon={AiOutlineFileAdd()}
            color="Olive"
            onClick={() => navigate("/receipts/choose-vehicle")}
          />
        </div>
      </div>
      {showSearchFilter ? (
        <div>
          <div id="search-filter">
            <div id="search-filter-input">
              <label>Naziv automobila:</label>
              <input type="text"></input>
            </div>
          </div>
          <ReceiptList showButtons={false} />
        </div>
      ) : (
        <ReceiptList showButtons={true} />
      )}
    </div>
  );
};

export default Receipts;
