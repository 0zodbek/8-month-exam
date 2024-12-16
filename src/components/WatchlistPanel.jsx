import { X } from "lucide-react";

export function WatchlistPanel({
  isOpen,
  onClose,
  watchedCoins,
  onRemoveFromWatchlist,
}) {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-[511px] bg-gray-800/95 border-l border-blue-900/20 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <div className="p-4 border-b border-blue-900/20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-cyan-400">WATCHLIST</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="h-6 w-6" />
        </button>
      </div>

      <div className="p-4 flex gap-10 justify-around">
        {watchedCoins.length === 0 ? (
          <p className="text-gray-400 text-center">No coins in watchlist</p>
        ) : (
          watchedCoins.map((coin) => (
            <div
              key={coin.id}
              className="bg-gray-900 w-48 h-60 px-10 py-4 rounded-lg border border-blue-900/20"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center mx-auto gap-3">
                  <img src={coin.image} alt={coin.name} className="w-28 h-w-28" />
                  <div>
                    
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <div className="text-lg text-center mt-7">
                  ${coin.current_price.toLocaleString()}
                </div>
              </div>
              <button
                  onClick={() => onRemoveFromWatchlist(coin.id)}
                  className="text-white bg-[#FF0000] w-[106px] mt-2 h-8"
                >
                  Remove
                </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
