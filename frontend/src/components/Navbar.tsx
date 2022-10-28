import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import backgroundButton1 from "../../public/assets/bmc-logo.svg";
import Image from "next/image";
import { BuyMeACoffeeContext } from "../context/Context";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(BuyMeACoffeeContext);
  console.log(currentAccount);
 

  return (
    <div className="custom_nav  d-flex align-items-center">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center  ">
          <Image src={backgroundButton1} width={50} height={50} alt="btn" /> <span className="nav_logo_title ">Buy me a Coffee</span>
        </div>
        <div className="d-flex me-3">
          {currentAccount ? (
            <button disabled onClick={connectWallet} className="btn custom_button rounded-pill" type="submit">
              {currentAccount ? "Connected" : "Connect Wallet"}
            </button>
          ) : (
            <button onClick={connectWallet} className="btn custom_button rounded-pill" type="submit">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
