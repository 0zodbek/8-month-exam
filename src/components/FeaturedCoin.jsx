import { useState, useEffect } from "react";

export function FeaturedCoinsSlider({ coins }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % coins.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [coins.length]);

  return (
    <div className="relative bg-contain bg-no-repeat bg-[url(C:\Users\ASUS\Desktop\8-OY-IMTIHON\public\images\bg.png)] h-[400px] items-center overflow-hidden bg-gray-800/30 rounded-lg border border-blue-900/20 backdrop-blur-sm">
      <h2 className="text-6xl text-[#87CEEB] font-bold text-center mt-[69px]">
        CRYPTOFOLIO WATCH LIST
      </h2>
      <h3 className="font-medium text-sm text-center mt-4 text-[#A9A9A9] mb-10">
        Get all the Info regarding your favorite Crypto Currency
      </h3>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 25}%)` }}
      >
        {coins.map((coin) => (
          <div key={coin.id} className="w-1/4 flex-shrink-0 p-6">
            <div className="flex flex-col  items-center  mb-2">
              <img src={coin.image} alt={coin.name} className="w-20 h-w-20 mb-3" />
              <span className="text-gray-400 font-medium">
                {coin.symbol.toUpperCase()}
              </span>
              <p className="font-medium text-xl">${coin.current_price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
 