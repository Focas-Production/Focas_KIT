import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { CartContext } from "../../../context/CartContext";
import { useKit } from "../../../context/KitContext";
import products from "../../../data/products";

export default function MaterialDetailComponent() {
  const { keyName } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, getProductQuantity, getShopPath } =
    useContext(CartContext);
  const { selectedKit, getProductPrice } = useKit();

  // Find the product by keyName
  const product = products.find((p) => p.keyName === keyName);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const currentPrice = getProductPrice(product);
  const quantity = getProductQuantity(product.id, selectedKit);

  const handleAddToCart = () => {
    addToCart(product.id, {
      kitType: selectedKit,
      price: currentPrice,
    });
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id, selectedKit);
  };

  const handleBuyNow = () => {
    const shopPath = getShopPath(product, selectedKit);
    if (shopPath) {
      window.open(shopPath, "_blank");
    } else {
      console.error("Shop path not found for product:", product.title);
      alert("Shop path not available for this product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {product.tag && (
                <span className="inline-block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {product.tag}
                </span>
              )}

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              {product.bulletPoints && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    What's included:
                  </h3>
                  <ul className="space-y-2">
                    {product.bulletPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.offer && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-700 font-medium">{product.offer}</p>
                </div>
              )}

              {/* Kit Selection Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <span className="font-semibold">Current Kit:</span>{" "}
                  {selectedKit}
                </p>
                <p className="text-sm text-blue-600 mt-1">
                  You can change the kit type on the main shop page
                </p>
              </div>

              {/* Price and Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-3xl font-bold text-gray-900">
                      ₹ {currentPrice}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedKit} price
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  {/* <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                    <button
                      onClick={handleRemoveFromCart}
                      disabled={quantity === 0}
                      className="text-gray-500 hover:text-gray-700 disabled:opacity-40 cursor-pointer"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="mx-4 text-lg font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleAddToCart}
                      className="text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <Plus size={18} />
                    </button>
                  </div> */}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleBuyNow}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                  >
                    Buy Now
                  </button>

                  {/* <button
                    onClick={handleAddToCart}
                    className="w-full bg-white border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition duration-200"
                  >
                    Add to Cart
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
