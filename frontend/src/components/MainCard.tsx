import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { SiEthereum } from "react-icons/si";
import backgroundButton from "../../public/assets/bmc-logo.svg";
import backgroundButton1 from "../../public/assets/black-button.png";

const MainCard = () => {
  const [currentWalletAddress, setCurrentWalletAddress] = useState("");
  const [connectionStarted, setConnectionStarted] = useState(false);
  const [connectionPending, setConnectionPending] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false);

  //first checking window.ethereum object is present or not that means metamask is installed or not
  const connectWallet = async () => {
    setConnectionStarted(true);
    setConnectionPending(true);
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentWalletAddress(accounts[0]);
        setConnectionSuccess(true);
        setConnectionPending(false);
        console.log(`Wallet connected successfully and wallet address is ${accounts[0]}`);
      } catch (error) {
        setConnectionPending(true);
        console.log(error);
      }
    } else {
      console.log("Please install metamask");
    }
  };

  // although wallet gets connected but after refresh it wipe so lets get currentlyConnextWalledAddress
  useEffect(() => {
    const getCurrentlyConnectedWalletAddress = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" }); //Note this eth_accounts
          if (accounts.length > 0) {
            setCurrentWalletAddress(accounts[0]);
            setConnectionSuccess(true);
            setConnectionPending(false);
          } else {
            console.log("Wallet is not connected please try again once ");
          }
        } catch (error) {}
      } else {
        console.log("Please install metamask");
      }
    };
    getCurrentlyConnectedWalletAddress();
  });

  //when we changed wallet or disconnected the wallet the effect should be immediately reflect in the frontend
  useEffect(() => {
    const walletRemovedOrWalletChangedListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        window.ethereum.on("accountsChanged", (accounts: any) => {
          setCurrentWalletAddress(accounts[0]);
          setConnectionSuccess(true);
          setConnectionPending(false);
        });
      } else {
        setCurrentWalletAddress("");
        setConnectionSuccess(false);
        setConnectionPending(true);
        console.log("Please install metamask");
      }
    };
    walletRemovedOrWalletChangedListener();
  });

  return (
    <div className="main_card p-3  rounded-1  col-6">
      {/* <Image src={backgroundButton} objectFit="fill" alt="btn" />  */}
      {connectionPending && !connectionSuccess ? (
        <p className="custom_warning_toast alert alert-warning text-center border-0 rounded-1" role="alert">
          Please accept the Metamask connection request from your wallet !!!
        </p>
      ) : null}
      <div className="d-flex justify-content-center mb-4">
        {connectionSuccess && currentWalletAddress && !connectionPending ? (
          <button disabled onClick={connectWallet} className="btn connection_success_button py-2 rounded-pill">
            {currentWalletAddress ? "Connected" : "Connect wallet"}
          </button>
        ) : (
          <button onClick={connectWallet} className="btn custom_button py-2 rounded-pill">
            {currentWalletAddress ? "Connected" : "Connect wallet"}
          </button>
        )}
      </div>
      <Image src={backgroundButton} height={200} alt="btn" />

      <div className="sub_card_bg row d-flex flex-column m-0 rounded-1 ">
        <div className="col d-flex d-flex  justify-content-between ">
          <h4>Account</h4>
          
        </div>

        <div className="col d-flex justify-content-between">
          <p> {currentWalletAddress ? currentWalletAddress : "Receiver wallet address !"} </p>
        </div>
      </div>

      <div className="input-group input-group-lg flex-nowrap mt-4 ">
        <span className="input_icon_div input-group-text border-0">
          <FaUserAlt />
        </span>
        <input type="text" className=" custom_input_bg border-0 form-control " placeholder="Your Name" />
      </div>

      {/* <div className="input-group  input-group-lg flex-nowrap mt-2 ">
        <span className=" input_icon_div input-group-text border-0">
          <SiEthereum />
        </span>
        <input type="text" disabled className=" custom_input_bg border-0  form-control" placeholder="You are sending amount to :" />
      </div> */}

      <textarea className="custom_input_bg border-0 rounded-1 mt-2 form-control" placeholder="Message"></textarea>
      <span>Each coffee is of cost 0.001 Eth <SiEthereum /></span>

      <div className="d-flex justify-content-center mt-4">
        <button className="btn custom_button py-2 rounded-pill">Buy me a coffee   </button>
      </div>
    </div>
  );
};

export default MainCard;
