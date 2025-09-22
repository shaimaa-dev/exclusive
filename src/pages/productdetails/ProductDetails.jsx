import Product from './components/Product'
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import RelatedProducts from './components/RelatedProducts';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await axios.get(`https://dummyjson.com/products/${id}`);
                await setProduct(data.data)
                console.log(product);
            } catch (error) {
                console.log(error.messagge);
            }
        }
        fetchData();
    },[id])
  return (
    <div>
      <Product product={product} />
      <RelatedProducts product={product} />
    </div>
  )
}

export default ProductDetails
