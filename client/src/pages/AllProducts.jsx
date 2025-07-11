// client/src/pages/AllProducts.jsx
import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';

function AllProducts() {
    const { products, searchQuery } = useAppContext();
    const [filterdProducts, setFilterdProducts] = useState([]);

    useEffect(() => {

        if(searchQuery.length > 0) {
            setFilterdProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))
        }else {
            setFilterdProducts(products);
        }
    },[products, searchQuery]);
  return (
    <div className='mt-16 flex flex-col gap-6'>
        <div className='flex flex-col items-end w-max gap-2'>
            <p className='text-2xl font-medium uppercase'>All products</p>
            <div className='w-16 h-0.5 bg-yellow-400 rounded-full'></div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-6 lg:grid-col-5 mt-6'>
            {filterdProducts.filter((product)=> product.inStock).map((product, index) => (
                <ProductCard key={index} product={product} />
                ))}
        </div>
      
    </div>
  )
}

export default AllProducts
