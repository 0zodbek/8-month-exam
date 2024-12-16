// import React, { useState, useEffect } from "react";
// import ResponsivePagination from "react-responsive-pagination";
// import { useNavigate } from "react-router-dom";
// import "react-responsive-pagination/themes/classic.css";
// import { FeaturedCoinsSlider } from "../components/FeaturedCoin.jsx";
// const CryptoList = () => {
//   const [coins, setCoins] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currency, setCurrency] = useState("USD");
//   const [exchangeRates, setExchangeRates] = useState({});
//   const [selectedCoin, setSelectedCoin] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCoins();
//     fetchExchangeRates();
//   }, [currentPage, currency]);

//   const fetchCoins = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`
//       );
//       const data = await response.json();
//       setCoins(data);
//       setTotalPages(Math.ceil(100 / 10));
//     } catch (error) {
//       console.error("Error fetching coin data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
//       const data = await response.json();
//       console.log(data); // API dan olingan ma'lumotlarni konsolga chiqarish
//       setExchangeRates(data.rates);
//     } catch (error) {
//       console.error("Error fetching exchange rates:", error);
//     }
//   };

//   const convertPrice = (priceInUSD) => {
//     if (currency === "USD") return priceInUSD;
//     const rate = exchangeRates[currency];
//     return rate ? priceInUSD * rate : priceInUSD;
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(price);
//   };

//   const filteredCoins = coins.filter((coin) =>
//     coin.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCurrencyChange = (e) => {
//     setCurrency(e.target.value);
//     fetchCoins(); // Valyuta o'zgarganda yangi ma'lumotlarni olish
//   };

//   const handleCoinClick = (coinId) => {
//     navigate(`/cryptoDetails/${coinId}`);
//   };

//   return (
//     <div className="w-[1920px] h-[1677px] mx-auto bg-[#14161A] text-white">
//       <header className="flex items-center justify-between p-4 bg-gray-800">
//         <h1 className="text-2xl font-bold text-cyan-400">CRYPTOFOLIO</h1>
//         <div className="flex items-center gap-4">
//           <select
//             className="bg-gray-700 text-white px-3 py-1 rounded"
//             value={currency}
//             onChange={handleCurrencyChange}
//           >
//             <option value="usd">USD</option>
//             <option value="rub">RUB</option>
//             <option value="uzs">UZS</option>
//           </select>
//           <button className="bg-cyan-400 text-gray-900 px-4 py-1 rounded font-medium">
//             WATCH LIST
//           </button>
//         </div>
//       </header>

//       <main className="container bg-[#131519] mx-auto px-4 ">

//         <div className="mb-5 ml-[-208px] w-[1920px] mx-auto bg-[url(C:\Users\Noutbukcom\Desktop\8-OY-IMTIHON\public\images\bg.png)]">
//           <FeaturedCoinsSlider
//             coins={coins}
//             convertPrice={convertPrice}
//             formatPrice={formatPrice}
//           />
//         </div>
//         <h2 className="text-[34px] text-center font-light leading-10 tracking-widest mb-6">
//           Cryptocurrency Prices by Market Cap
//         </h2>

//         <input
//           type="text"
//           placeholder="Search for a cryptocurrency..."
//           className="w-full h-16 p-5 font-normal text-base leading-4 tracking-widest mb-4 bg-transparent border border-s-neutral-600 outline-none rounded"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {loading ? (
//           <p className="mx-auto mt-[700px]">
//             <span className="loading loading-spinner loading-lg text-info"></span>
//           </p>
//         ) : (
//           <table className="w-full">
//             <thead>
//               <tr className="text-left bg-[#87CEEB] text-black">
//                 <th className="p-2">Coin</th>
//                 <th className="p-2 text-end">Price</th>
//                 <th className="p-2 text-end">24h Change</th>
//                 <th className="p-2 text-end">Market Cap</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCoins.map((coin) => (
//                 <tr
//                   key={coin.id}
//                   className="border-b h-[93px] border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors"
//                   onClick={() => handleCoinClick(coin.id)}
//                 >
//                   <td className="p-2 flex py-6 items-center">
//                     <img
//                       src={coin.image}
//                       alt={coin.name}
//                       className="w-12 h-w-12 mr-4"
//                     />
//                     <span className="flex flex-col ml-3">
//                       <p className="text-2xl uppercase font-normal">{coin.symbol}</p>
//                       <p className="text-sm font-normal text-[#A9A9A9]">{coin.name}</p>
//                     </span>
//                   </td>
//                   <td className="p-2 text-end text-sm font-normal">
//                     {currency} {convertPrice(coin.current_price).toFixed(2)}
//                   </td>
//                   <td
//                     className={`p-2 text-end ${
//                       coin.price_change_percentage_24h > 0
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }`}
//                   >
//                     {coin.price_change_percentage_24h.toFixed(2)}%
//                   </td>
//                   <td className="p-2 text-end">
//                     {currency} {convertPrice(coin.market_cap).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <div className="mt-4">
//           <ResponsivePagination
//             current={currentPage}
//             total={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CryptoList;

//////////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import { useState, useEffect } from "react";
import ResponsivePagination from "react-responsive-pagination";
import { Eye, EyeOff } from "lucide-react";
import { WatchlistPanel } from "../components/WatchlistPanel";
import "react-responsive-pagination/themes/classic.css";
import { FeaturedCoinsSlider } from "../components/FeaturedCoin";
import { useNavigate } from "react-router-dom";
export default function CryptoList() {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState({});
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [watchedCoins, setWatchedCoins] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    fetchCoins();
    fetchExchangeRates();
  }, [currentPage, currency]);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`
      );
      const data = await response.json();
      setCoins(data);
      setTotalPages(Math.ceil(100 / 10));
    } catch (error) {
      console.error("Error fetching coin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error("Error fetching exchange rates:", error);
    }
  };

  const toggleWatchlist = (coin, e) => {
    e.stopPropagation(); // Prevent row click event
    setWatchedCoins((prev) => {
      const isWatched = prev.some((c) => c.id === coin.id);
      if (isWatched) {
        return prev.filter((c) => c.id !== coin.id);
      } else {
        return [...prev, coin];
      }
    });
  };

  const convertPrice = (priceInUSD) => {
    if (currency === "USD") return priceInUSD;
    const rate = exchangeRates[currency];
    return rate ? priceInUSD * rate : priceInUSD;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
    fetchCoins();
  };

  const handleCoinClick = (coinId) => {
    navigate(`/cryptoDetails/${coinId}`);
  };

  return (
    <div className="w-[1920px] h-[1677px] mx-auto bg-[#14161A] text-white">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">CRYPTOFOLIO</h1>
        <div className="flex items-center gap-4">
          <select
            className="bg-gray-700 text-white px-3 py-1 rounded"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="usd">USD</option>
            <option value="rub">RUB</option>
            <option value="uzs">UZS</option>
          </select>
          <button
            className="bg-cyan-400 text-gray-900 px-4 py-1 rounded font-medium"
            onClick={() => setIsWatchlistOpen(true)}
          >
            WATCH LIST
          </button>
        </div>
      </header>

      <main className="container bg-[#131519] mx-auto px-4">
        <div className="mb-5 ml-[-208px] w-[1920px] mx-auto bg-[url(/images/bg.png)]">
          <FeaturedCoinsSlider
            coins={coins}
            convertPrice={convertPrice}
            formatPrice={formatPrice}
          />
        </div>
        <h2 className="text-[34px] text-center font-light leading-10 tracking-widest mb-6">
          Cryptocurrency Prices by Market Cap
        </h2>

        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="w-full h-16 p-5 font-normal text-base leading-4 tracking-widest mb-4 bg-transparent border border-[#4A4C4F] outline-none rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <p className="mx-auto mt-[700px]">
            <span className="loading loading-spinner loading-lg text-info"></span>
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left bg-[#87CEEB] text-black">
                <th className="p-2">Coin</th>
                <th className="p-2 text-end">Price</th>
                <th className="p-2 text-end">24h Change</th>
                <th className="p-2 text-end">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-b h-[93px] border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => handleCoinClick(coin.id)}
                >
                  <td className="p-2 flex py-6 items-center">
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-12 h-w-12 mr-4"
                    />
                    <span className="flex flex-col ml-3">
                      <p className="text-2xl uppercase font-normal">
                        {coin.symbol}
                      </p>
                      <p className="text-sm font-normal text-[#A9A9A9]">
                        {coin.name}
                      </p>
                    </span>
                  </td>
                  <td className="p-2 text-end text-sm font-normal">
                    {currency} <span>{convertPrice(coin.current_price).toFixed(2)}</span>
                  </td>
                  <td className="p-2 text-end relative group">
                    <button
                      onClick={(e) => toggleWatchlist(coin, e)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-100 transition-opacity"
                    >
                      {watchedCoins.some((c) => c.id === coin.id) ? (
                        <Eye className="h-5 w-5 text-cyan-400" />
                      ) : (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                    <span
                      className={`${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      } mr-8`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </span>
                  </td>
                  <td className="p-2 text-end">
                    {currency} {convertPrice(coin.market_cap).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="mt-4">
          <ResponsivePagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>

      <WatchlistPanel
        isOpen={isWatchlistOpen}
        onClose={() => setIsWatchlistOpen(false)}
        watchedCoins={watchedCoins}
        onRemoveFromWatchlist={(coinId) =>
          setWatchedCoins((prev) => prev.filter((coin) => coin.id !== coinId))
        }
      />
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import ResponsivePagination from 'react-responsive-pagination';
// import { useNavigate } from 'react-router-dom';
// import { Watchlist } from '../components/WatchlistPanel.jsx';
// import 'react-responsive-pagination/themes/classic.css';

// const CryptoList = () => {
//   const [coins, setCoins] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [currency, setCurrency] = useState('USD');
//   const [exchangeRates, setExchangeRates] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCoins();
//     fetchExchangeRates();
//   }, [currentPage, currency]);

//   const fetchCoins = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=${currentPage}&sparkline=false&price_change_percentage=24h`
//       );
//       const data = await response.json();
//       setCoins(data);
//       setTotalPages(Math.ceil(100 / 10)); // CoinGecko free tier limitation
//     } catch (error) {
//       console.error('Error fetching coin data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchExchangeRates = async () => {
//     try {
//       const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
//       const data = await response.json();
//       setExchangeRates(data.rates);
//     } catch (error) {
//       console.error('Error fetching exchange rates:', error);
//     }
//   };

//   const convertPrice = (price) => {
//     if (currency === 'USD') return price;
//     return price * exchangeRates[currency];
//   };

//   const filteredCoins = coins.filter((coin) =>
//     coin.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleCurrencyChange = (e) => {
//     setCurrency(e.target.value);
//   };

//   const handleCoinClick = (coinId) => {
//     navigate(`/cryptoDetails/${coinId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <header className="flex items-center justify-between p-4 bg-gray-800">
//         <h1 className="text-2xl font-bold text-cyan-400">CRYPTOFOLIO</h1>
//         <div className="flex items-center gap-4">
//           <select
//             className="bg-gray-700 text-white px-3 py-1 rounded"
//             value={currency}
//             onChange={handleCurrencyChange}
//           >
//             <option value="USD">USD</option>
//             <option value="RUB">RUB</option>
//             <option value="UZS">UZS</option>
//           </select>
//           <button className="bg-cyan-400 text-gray-900 px-4 py-1 rounded font-medium">
//             WATCH LIST
//           </button>
//         </div>
//       </header>

//       <main className="container mx-auto px-4 py-8">
//         <h2 className="text-3xl font-bold mb-6">Cryptocurrency Prices by Market Cap</h2>
//         <input
//           type="text"
//           placeholder="Search for a cryptocurrency..."
//           className="w-full p-2 mb-4 bg-gray-800 rounded"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <table className="w-full">
//             <thead>
//               <tr className="text-left bg-gray-800">
//                 <th className="p-2">Coin</th>
//                 <th className="p-2">Price</th>
//                 <th className="p-2">24h Change</th>
//                 <th className="p-2">Market Cap</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCoins.map((coin) => (
//                 <tr
//                   key={coin.id}
//                   className="border-b border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors"
//                   onClick={() => handleCoinClick(coin.id)}
//                 >
//                   <td className="p-2 flex items-center">
//                     <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
//                     <span>{coin.name}</span>
//                   </td>
//                   <td className="p-2">
//                     {currency} {convertPrice(coin.current_price).toFixed(2)}
//                   </td>
//                   <td className={`p-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
//                     {coin.price_change_percentage_24h.toFixed(2)}%
//                   </td>
//                   <td className="p-2">
//                     {currency} {convertPrice(coin.market_cap).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         <div className="mt-4">
//           <ResponsivePagination
//             current={currentPage}
//             total={totalPages}
//             onPageChange={setCurrentPage}
//           />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default CryptoList;
