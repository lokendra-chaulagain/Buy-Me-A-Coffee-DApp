import React, { useContext } from "react";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
// import { TransactionContext } from "../context/context";
import backgroundButton from "../../public/assets/bmc-button.png";
import backgroundButton1 from "../../public/assets/bmc-logo.svg";
import Image from "next/image";

const Navbar = () => {
  //   const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <nav className="navbar navbar-expand-lg custom_nav">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <GiHamburgerMenu className="custom_hamburger" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          {/* <a className="navbar-brand">My Logo</a> */}
          <Image src={backgroundButton1} width={50} height={50} alt="btn" /> <span className="text_color fw" >Buy me a Coffee</span>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href={"/"}>
                <a className="nav-link active" aria-current="page">
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href={"/history"}>
                <a className="nav-link">History</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={"/transactions"}>
                <a className="nav-link">Transactions</a>
              </Link>
            </li>

            <li className="nav-item">
              <Link href={"/logout"}>
                <a className="nav-link">Logout</a>
              </Link>
            </li>
          </ul>
          <div className="d-flex me-3">
            <button className="btn custom_button rounded-pill" type="submit">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
