import React from "react";

const DishModal = ({ open, onClose, dish }) => {
  if (!open || !dish) return null;

  const { name, price, image, macros } = dish;

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="relative">
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 text-gray-600 dark:text-gray-300 hover:text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="flex flex-col md:flex-row items-stretch">
            {/* Left: image */}
            <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50 dark:bg-gray-800">
              <img src={image} alt={name} className="w-full max-w-sm rounded-lg object-cover" />
            </div>

            {/* Right: details/macros */}
            <div className="md:w-1/2 p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{name}</h3>
              <p className="text-xl font-semibold text-orange-500 mb-4">Price: ₹{price}</p>

              <h4 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">Nutrition (may differ per portion)</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-100 dark:bg-[#111827] p-3 rounded">
                  <div className="text-sm text-gray-500">Calories</div>
                  <div className="text-lg font-bold">{macros?.calories ?? "-"} kcal</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#111827] p-3 rounded">
                  <div className="text-sm text-gray-500">Protein</div>
                  <div className="text-lg font-bold">{macros?.protein ?? "-"} g</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#111827] p-3 rounded">
                  <div className="text-sm text-gray-500">Carbs</div>
                  <div className="text-lg font-bold">{macros?.carbs ?? "-"} g</div>
                </div>
                <div className="bg-gray-100 dark:bg-[#111827] p-3 rounded">
                  <div className="text-sm text-gray-500">Fat</div>
                  <div className="text-lg font-bold">{macros?.fat ?? "-"} g</div>
                </div>
              </div>

              {macros?.notes && (
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{macros.notes}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DishModal;
