import React, { useEffect, useState } from "react";
import abi from "../utils/BuyMeACoffee.json";
import { ethers } from "ethers";
import MainCard from "../components/MainCard";
import LatestTransactionTable from "../components/LatestCoffeeBoughtTable";
import LatestCoffeeBoughtTable from "../components/LatestCoffeeBoughtTable";
import Navbar from "../components/Navbar";

function Index() {
  const contractAddress = "0x8bd41849a3be6408Df57D801e744DF4244c5f79B";
  const contractABI = abi.abi;

  // Component state
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [memos, setMemos] = useState([]);

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };

  const onMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  console.log(name);
  console.log(message);

  // Wallet connection logic
  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts: ", accounts);
      if (accounts.length > 0) {
        const account = accounts[0];
        console.log("wallet is connected! " + account);
      } else {
        console.log("make sure MetaMask is connected");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("please install MetaMask");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const buyCoffee = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();

        // contract instance
        const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);
        console.log("buying coffee..");
        const coffeeTxn = await buyMeACoffee.buyCoffee(name ? name : "anon", message ? message : "Enjoy your coffee!", { value: ethers.utils.parseEther("0.001") });
        await coffeeTxn.wait();
        console.log("mined ", coffeeTxn.hash);
        console.log("coffee purchased!");
        // Clear the form fields.
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch all memos stored on-chain.
  const getMemos = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const buyMeACoffee = new ethers.Contract(contractAddress, contractABI, signer);

        console.log("fetching memos from the blockchain..");
        const memos = await buyMeACoffee.getMemos();
        console.log("fetched!");
        setMemos(memos);
      } else {
        console.log("Metamask is not connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(memos);

  return (
    // <div className="">
    //   <button onClick={connectWallet}>connect</button>
    //   <input onChange={onNameChange} name="name" type="text" placeholder="name" />
    //   <input onChange={onMessageChange} name="message" type="text" placeholder="message" />
    //   <button onClick={buyCoffee}>buy coffee</button>
    // </div>

    <>
      <Navbar />
      <div className="app_body  d-flex flex-column align-items-center gap-2 mt-5">
        <MainCard />
        <LatestCoffeeBoughtTable />
      </div>
    </>
  );
}

export default Index;
