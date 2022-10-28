import React from "react";
import MainCard from "../components/MainCard";
import LatestCoffeeBoughtTable from "../components/LatestCoffeeBoughtTable";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  return (
    <>
      <Navbar />
      <div className="app_body  d-flex flex-column align-items-center gap-2 mt-5">
        <MainCard />
        <LatestCoffeeBoughtTable />
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
    </>
  );
}

export default Index;
