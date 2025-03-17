import React from "react";

const ProductCardSkeleton = ({ count = 1 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse p-4 bg-gray-200 rounded-lg shadow-md"
        >
          <div className="w-full h-40 bg-gray-300 rounded"></div>
          <div className="mt-4 h-4 bg-gray-400 rounded w-3/4"></div>
          <div className="mt-2 h-4 bg-gray-400 rounded w-1/2"></div>
          <div className="mt-4 h-6 bg-gray-500 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductCardSkeleton;
