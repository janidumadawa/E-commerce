// client/src/pages/ProductDetails.jsx
import React, { useEffect } from "react";
import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { id } = useParams();

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(
        (item) => item.category === product.category
      );
      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  useEffect(() => {
    setThumbnail(product?.images[0] ? product.images[0] : null);
  }, [product])

  return (
    product && (
      <div className="mt-12">
        <p>
          <Link to={"/"}>Home</Link> /
          <Link to={"/products"}> Products</Link> /
          <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
          <span className="text-yellow-500"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.images.map((images, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(images)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={images} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>(
                    <img src={ i<4 ? "./src/assets/star_icon.svg" : "./src/assets/star_dull_icon.svg"} alt="" className="w-4 h-3.5" key={i} />
                
                ))}
              <p className="text-base ml-2">(4)</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
              </p>
              <p className="text-2xl font-medium">{currency}{product.price}</p>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button onClick={()=> addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                Add to Cart
              </button>
              <button onClick={()=> {addToCart(product._id); navigate("/cart")}} className="w-full py-3.5 cursor-pointer font-medium bg-yellow-500 text-white hover:bg-yellow-600 transition">
                Buy now
              </button>
            </div>
          </div>
        </div>
        {/* related products */}
        <div className="flex flex-col items-center mt-20">
              <div className="flex flex-col item-center w-max">
                <p className="text-3xl font-medium">Related Products</p>
                <div className="w-20 h-0.5 bg-yellow-400 rounded-full mt-2"></div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                {relatedProducts.filter((product)=> product.inStock).map ((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
              </div>
              <button onClick={()=> {navigate('/products'); scrollTo(0,0)}} 
              className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-yellow-400 hover:bg-yellow-500/10 transition ">
                See more
              </button>
        </div>

      </div>
    )
  );
};

export default ProductDetails;
