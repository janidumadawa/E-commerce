// client/src/components/Categories.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import organic_vegitable_image from '../assets/organic_vegitable_image.png';
import fresh_fruits_image from '../assets/fresh_fruits_image.png';
import bottles_image from '../assets/bottles_image.png';
import maggi_image from '../assets/maggi_image.png';
import dairy_product_image from '../assets/dairy_product_image.png';
import bakery_image from '../assets/bakery_image.png';
import grain_image from '../assets/grain_image.png';

const categories = [
  {
    text: "Organic veggies",
    path: "Vegetables",
    image: organic_vegitable_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "Fresh Fruits",
    path: "Fruits",
    image: fresh_fruits_image,
    bgColor: "#FEE0E0",
  },
  {
    text: "Cold Drinks",
    path: "Drinks",
    image: bottles_image,
    bgColor: "#F0F5DE",
  },
  {
    text: "Instant Food",
    path: "Instant",
    image: maggi_image,
    bgColor: "#E1F5EC",
  },
  {
    text: "Dairy Products",
    path: "Dairy",
    image: dairy_product_image,
    bgColor: "#FEE6CD",
  },
  {
    text: "Bakery & Breads",
    path: "Bakery",
    image: bakery_image,
    bgColor: "#E0F6FE",
  },
  {
    text: "Grains & Cereals",
    path: "Grains",
    image: grain_image,
    bgColor: "#F1E3F9",
  },
];

function Categories() {
  const navigate = useNavigate();

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Categories</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6'>
        {categories.map((category, index) => (
          <div
            key={index}
            className='group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className='group-hover:scale-105 transition max-w-28'
            />
            <p className='text-sm font-medium'>{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
