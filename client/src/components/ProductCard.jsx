// client/src/components/ProductCard.jsx
import React from "react";
import { dummyProducts } from "../assets/dummyProduct";
import { useAppContext } from "../context/AppContext";


const ProductCard = ({product}) => {
  const {currency, addToCart, removeFromCart, cartItems, navigate} = useAppContext();


  return product && (
    <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0,0)}} 
    className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <img
          className="group-hover:scale-105 transition max-w-26 md:max-w-36"
          src={product.images[0]}
          alt={product.name}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <p>{product.category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {Array(5).fill("").map((_, i) => (
              <img key={i} className="md:w-3.5 w3" src={i<4 ? "./src/assets/star_icon.svg": "./src/assets/star_dull_icon.svg"} alt=""/>
          ))}

          <p>(4)</p>
        </div>

        {/* Price & Counter */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-yellow-500">
            {currency} {product.offerPrice}{""}
            <span className="text-gray-500/60 md:text-sm text-xs line-through ml-1">
              {currency} {product.price}
            </span>
          </p>

          {/* Counter / Add */}
          <div onClick={(e)=> {e.stopPropagation(); }} className="text-yellow-500">
            {!cartItems[product._id] ? (
              <button
                className="flex items-center justify-center gap-1 bg-yellow-100 border border-yellow-300 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer text-yellow-600 font-medium"
                onClick={() => addToCart(product._id)}
              >
                <img src="./src/assets/cart_icon.svg" alt="Add to cart" className="w-4 h-4" />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-yellow-500/25 rounded select-none">
                <button onClick={() => {removeFromCart(product._id)}} 
                className="cursor-pointer text-md px-2 h-full">
                    -
                    </button>
                <span className="w-5 text-center">{cartItems[product._id]}</span>
                <button onClick={() => {addToCart(product._id)}} className="cursor-pointer text-md px-2 h-full">
                    +
                    </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
