import React from "react";

type Props = {
  total: number;
};

function ProductCardsLoader({ total }: Props) {
  return (
    <>
      {Array.from(Array(total)).map((_, idx) => (
        <div
          key={idx}
          className="w-full min-h-80 border-2 border-gray-100 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none]"
        >
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-6">
              <div className="h-40 bg-slate-200 rounded"></div>
              <div className="space-y-3 p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-3"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductCardsLoader;
