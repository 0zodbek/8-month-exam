import React, { useEffect, useState, useRef } from 'react';
// import { keyframes, css } from '@emotion/react';

const CryptoCarousel = ({ currency, exchangeRates, onCoinClick }) => {
  const [coins, setCoins] = useState([]);
  const isMounted = useRef(true);

  const convertPrice = (price) => {
    return price * exchangeRates[currency];
  };

  const scrollAnimation = keyframes`
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  `;

  const carouselStyles = css`
    .animate-scroll {
      animation: ${scrollAnimation} 30s linear infinite;
    }
    .animate-scroll:hover {
      animation-play-state: paused;
    }
  `;

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`
        );
        const data = await response.json();
        if (isMounted.current) {
          // Duplicate the data for seamless infinite scroll
          setCoins([...data, ...data]);
        }
      } catch (error) {
        console.error('Error fetching carousel data:', error);
      }
    };

    fetchTopCoins();

    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [currency]);

  if (coins.length === 0) return null;

  return (
    <div className="relative w-full bg-gray-900 py-8 overflow-hidden" css={carouselStyles}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,200,255,0.1),transparent_50%)]"></div>
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            <path
              d="M10 0h30v1h-30zM0 10h50v1h-50zM10 20h30v1h-30zM0 30h50v1h-50zM10 40h30v1h-30z"
              fill="currentColor"
              className="text-cyan-500/20"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Title */}
      <div className="relative text-center mb-8">
        <h2 className="text-4xl font-bold text-cyan-400 mb-2">CRYPTOFOLIO WATCH LIST</h2>
        <p className="text-gray-400">Get All The Info Regarding Your Favorite Crypto Currency</p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div
          className="flex animate-scroll"
          style={{
            display: 'flex',
            animation: `${scrollAnimation} 30s linear infinite`,
          }}
        >
          {coins.map((coin, index) => (
            <div
              key={`${coin.id}-${index}`}
              style={{
                flexShrink: 0,
                width: '256px',
                margin: '0 16px',
                padding: '16px',
                backgroundColor: 'rgba(31, 41, 55, 0.5)',
                borderRadius: '8px',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(0, 200, 255, 0.2)',
                transition: 'all 0.3s',
                cursor: 'pointer',
              }}
              onClick={() => onCoinClick(coin.id)}
            >
              <div className="flex items-center gap-3 mb-2">
                <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                <div>
                  <h3 className="font-semibold text-white">{coin.symbol.toUpperCase()}</h3>
                  <span
                    className={`text-sm ${
                      coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="text-lg font-medium text-white">
                {currency} {convertPrice(coin.current_price).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoCarousel;

