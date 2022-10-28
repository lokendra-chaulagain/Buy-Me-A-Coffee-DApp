import { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";

import { contractAbi, contractAddress } from "../utils/constants";

export const BuyMeACoffeeContext = createContext();

export const BuyMeACoffeeContextProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const walletConnectionSuccessToast = () => toast.success("Wallet connected successfully");

  // This functions runs on every page refresh and gets connected wallet address.
  useEffect(() => {
    const getCurrentlyConnectedWalletAddress = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setCurrentAccount(accounts[0]);
          } else {
            console.log("Wallet is not connected please try again once ");
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Please install metamask");
      }
    };
    getCurrentlyConnectedWalletAddress();
  }, []);

  // Connect wallet function
  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setCurrentAccount(accounts[0]);
        walletConnectionSuccessToast();
        console.log(`Wallet connected successfully and wallet address is ${accounts[0]}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Please install metamask");
    }
  };

  // Function that listen on account changed
  useEffect(() => {
    const walletRemovedOrWalletChangedListener = async () => {
      if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        window.ethereum.on("accountsChanged", (accounts) => {
          setCurrentAccount(accounts[0]);
        });
      } else {
        console.log("Please install metamask");
      }
    };
    walletRemovedOrWalletChangedListener();
  });

  // Buy a coffee function
  const buyMeACoffee = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        //create instance of contract
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const buyMeACoffeeContract = new ethers.Contract(contractAddress, contractAbi, signer);

        console.log("buying coffee..");
        const parsedAmount = ethers.utils.parseEther("0.00001");
        const coffeeTransaction = await buyMeACoffeeContract.buyCoffee(name ? name : "anon", message ? message : "Enjoy your coffee!", { value: parsedAmount._hex });
        await coffeeTransaction.wait();
        console.log("mined ", coffeeTransaction.hash);
        console.log("coffee purchased!");
        setName("");
        setMessage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <BuyMeACoffeeContext.Provider value={{ connectWallet, currentAccount, buyMeACoffee, name, setName, message, setMessage }}>{children}</BuyMeACoffeeContext.Provider>;
};
