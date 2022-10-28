import Image from "next/image";
import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import backgroundButton from "../../public/assets/bmc-logo.svg";
import { BuyMeACoffeeContext } from "../context/Context";

const MainCard = () => {
  const { currentAccount, buyMeACoffee, name, setName, message, setMessage } = useContext(BuyMeACoffeeContext);

  console.log(currentAccount);
  console.log({ name, message });

  return (
    <div className="main_card p-3  rounded-1  col-6">
      {!currentAccount && (
        <p className="custom_warning_toast alert alert-warning text-center border-0 rounded-1" role="alert">
          Please accept the Metamask connection request from your wallet !!!
        </p>
      )}

      <div className="d-flex justify-content-center mb-4">
        <Image src={backgroundButton} height={200} alt="btn" />
      </div>

      <div className="sub_card_bg row d-flex flex-column m-0 rounded-1 ">
        <div className="col d-flex d-flex  justify-content-between ">
          <h4>Your Wallet Address</h4>
        </div>

        <div className="col d-flex justify-content-between">
          <p> {currentAccount ? currentAccount : "Receiver wallet address !"} </p>
        </div>
      </div>

      <div className="input-group input-group-lg flex-nowrap mt-4  ">
        <span className="input_icon_div input-group-text border-0 ">
          <FaUserAlt />
        </span>
        <input name="name" value={name} onChange={(e) => setName(e.target.value)} type="text" className=" custom_input_bg border-0 rounded-0 form-control " placeholder="Your Name" />
      </div>

      <textarea name="message" value={message} onChange={(e) => setMessage(e.target.value)} className="custom_input_bg border-0 rounded-1 mt-2 form-control" placeholder="Message"></textarea>
      <p className="d-flex align-items-center justify-content-center mt-4">
        Each coffee costs 0.001 Eth <SiEthereum />
      </p>

      <div className="d-flex justify-content-center mt-3">
        <button onClick={buyMeACoffee} className="btn custom_button py-2 rounded-pill" type="submit">
          Buy me a coffee
        </button>
      </div>
    </div>
  );
};

export default MainCard;
