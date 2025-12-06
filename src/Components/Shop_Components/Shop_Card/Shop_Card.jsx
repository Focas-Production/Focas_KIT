import { useNavigate } from "react-router-dom";
import { useKit } from "../../../context/KitContext"; // Import the Kit context
import products from "../../../data/products";


const ProductCard = ({ product, currentPrice, selectedKit }) => {
  const navigate = useNavigate();
  const isProKit = selectedKit === "Pro Kit";
console.log("Selected Kit:", selectedKit);

  // Determine correct shop path and image based on selected kit
const getShopPath = () => {
  if (selectedKit === "Lite Kit") return product.lite_shop_path;
  if (selectedKit === "Pro Kit") return product.pro_shop_path;
  return "";
};

const getImage = () => {
  if (selectedKit === "Pro Kit" && product.Essential_image) {
    return product.Essential_image;
  }
  return product.image;
};


  const handleCardClick = () => {
    const shopUrl = getShopPath();
    if (shopUrl) {
      window.open(shopUrl, "_blank");
    } else {
      console.warn("No shop path found for selected kit");
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    const shopUrl = getShopPath();
    if (shopUrl) {
      window.open(shopUrl, "_blank");
    } else {
      console.warn("No shop path found for selected kit");
    }
  };

  return (
    <div
      className={`product-card rounded-[16px] bg-white shadow-md p-4 flex flex-col sm:flex-row gap-4 sm:gap-6 border border-gray-200 transition duration-200 ${
        isProKit
          ? "cursor-default"
          : "cursor-pointer hover:shadow-lg hover:scale-[1.01]"
      }`}
      onClick={handleCardClick}
    >
      <div className="w-full sm:w-[160px] shrink-0">
        <img
          src={getImage()}
          alt={product.title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
        <div>
          <h3
            className="text-lg font-semibold truncate block text-ellipsis whitespace-nowrap"
            title={product.title}
          >
            {selectedKit === "Lite Kit" ? product.title : product.pro_title}
          </h3>
         <p
  className="text-gray-600 text-sm mt-1"
  dangerouslySetInnerHTML={{
    __html:
      selectedKit === "Lite Kit"
        ? product.description
        : product.pro_description,
  }}
/>

        </div>

        <div className="flex items-center justify-between mt-4">
        
              <div className="flex flex-col">
                <span className="text-lg font-bold">₹ {currentPrice}</span>
                <span className="text-xs text-gray-500">{selectedKit}</span>
              </div>
              <button
                onClick={handleBuyNow}
                className="text-sm cursor-pointer bg-blue-600 text-white px-4 py-1 rounded-full hover:bg-blue-700 transition"
              >
                Buy Now
              </button>
            
        </div>
      </div>
    </div>
  );
};

export default function ShopCard() {
  const { selectedKit, getProductPrice } = useKit(); // Use the Kit context

  return (
    <div className="shop-card p-4 sm:p-6">
      <div className="bg-white shadow-lg rounded-[32px] p-6 md:p-12 max-w-full md:max-w-[76%] lg:max-w-6xl 2xl:max-w-7xl mx-auto my-12">
        <div className="flex-col md:flex-row flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold text-center sm:text-left">
            Shop Study Kits
          </h2>
          <div className="text-sm text-gray-600 bg-blue-50 px-3 py-1 rounded-full mt-3 md:mt-0">
            Current Kit:{" "}
            <span className="font-semibold text-blue-700">{selectedKit}</span>
          </div>
        </div>

        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products.map((product, index) => {
            const currentPrice = getProductPrice(product);
            return (
              <ProductCard
                key={index}
                product={product}
                currentPrice={currentPrice}
                selectedKit={selectedKit}
              />
            );
          })}
        </div> */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {products
            // ✅ show FOCAS Planner (id 10) only for Pro Kit
            .filter(
              (product) =>
                !product.exclusiveFor || product.exclusiveFor === selectedKit
            )
            .map((product, index) => {
              const currentPrice = getProductPrice(product);
              return (
                <ProductCard
                  key={index}
                  product={product}
                  currentPrice={currentPrice}
                  selectedKit={selectedKit}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
