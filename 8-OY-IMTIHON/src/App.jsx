import React from "react";
import CryptoList from "./cryptoList";
import MainLayout from "./Layouts/MainLayout";
import CryptoDetails from "./pages/CryptoDetail";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <div className="min-h-screen bg-black">
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout className="p-6">
              <CryptoList />
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
