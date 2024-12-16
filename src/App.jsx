import React from "react";
import MainLayout from "./Layouts/MainLayout";
import CryptoDetails from "./pages/CryptoDetail";
import { Routes, Route } from "react-router-dom";
import CryptoList from "./pages/cryptoList";
const App = () => {
  return (
    <div className="min-h-screen bg-[#14161A]">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout className="p-6">
              <CryptoList></CryptoList>
            </MainLayout>
          }
        ></Route>
        <Route
          path="/cryptoDetails/:coinId"
          element={
            <MainLayout>
              <CryptoDetails></CryptoDetails>
            </MainLayout>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
