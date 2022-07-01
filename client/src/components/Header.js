import React from "react";
import { Link } from "react-router-dom";
import { BiReceipt } from "react-icons/bi";
import { FaCarSide } from "react-icons/fa";
import Button from "./Button";

const Header = () => {
  return (
    <header>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h1>PONG</h1>
      </Link>
      <div>
        <Link to="/receipts">
          <Button
            text="Upravljaj nalozima"
            icon={BiReceipt()}
            color="LaRioja"
            marginRight="2em"
          />
        </Link>
        <Link to="/vehicles">
          <Button
            text="Upravljaj vozilima"
            icon={FaCarSide()}
            color="LaRioja"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
