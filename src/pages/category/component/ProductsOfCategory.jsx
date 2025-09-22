import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import ProductCard from '../../products/components/ProductCard';

const ProductsOfCategory = () => {
  const [products, setProducts] = useState([])
  const location = useLocation();
  const category = location?.state;
  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(`https://dummyjson.com/products/category/${category.category.slug}`);
      console.log(data.data.products, 'data')
      setProducts(data.data.products)
    }
    fetchData();
  }, [category])
  console.log(category, "category");
  console.log(products, "products");
  return (
    <div className='w-[85%] mx-auto grid grid-cols-2 lg:grid-cols-3 lgl:grid-cols-4 gap-3 mb-10 gap-y-8'>
      {
        products && products.map((product) => {
          return (
            <ProductCard key={product.id} product={product} haveDiscount={true} />
          )
        })
      }
    </div>
  )
}

export default ProductsOfCategory
