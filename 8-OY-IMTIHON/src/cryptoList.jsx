import React, { useState, useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import { useNavigate } from 'react-router-dom';
import CryptoDetail from './pages/CryptoDetail';
import 'react-responsive-pagination/themes/classic.css';

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(null);
  const navigate = useNavigate();
  
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
      setTotalPages(Math.ceil(100 / 10)); // CoinGecko free tier limitation
    } catch (error) {
      console.error('Error fetching coin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      const data = await response.json();
      setExchangeRates(data.rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  const convertPrice = (price) => {
    if (currency === 'USD') return price;
    return price * exchangeRates[currency];
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleCoinClick = (coinId) => {
    navigate(`/cryptoDetails/${coinId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="flex items-center justify-between p-4 bg-gray-800">
        <h1 className="text-2xl font-bold text-cyan-400">CRYPTOFOLIO</h1>
        <div className="flex items-center gap-4">
          <select
            className="bg-gray-700 text-white px-3 py-1 rounded"
            value={currency}
            onChange={handleCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="RUB">RUB</option>
            <option value="UZS">UZS</option>
          </select>
          <button className="bg-cyan-400 text-gray-900 px-4 py-1 rounded font-medium">
            WATCH LIST
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Cryptocurrency Prices by Market Cap</h2>
        <input
          type="text"
          placeholder="Search for a cryptocurrency..."
          className="w-full p-2 mb-4 bg-gray-800 rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left bg-gray-800">
                <th className="p-2">Coin</th>
                <th className="p-2">Price</th>
                <th className="p-2">24h Change</th>
                <th className="p-2">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {filteredCoins.map((coin) => (
                <tr
                  key={coin.id}
                  className="border-b border-gray-700 cursor-pointer hover:bg-gray-800/50 transition-colors"
                  onClick={() => handleCoinClick(coin.id)}
                >
                  <td className="p-2 flex items-center">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-2" />
                    <span>{coin.name}</span>
                  </td>
                  <td className="p-2">
                    {currency} {convertPrice(coin.current_price).toFixed(2)}
                  </td>
                  <td className={`p-2 ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td className="p-2">
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
    </div>
  );
};

export default CryptoList;
