import { useEffect, useState } from 'react';
import HeaderSections from '../../home/components/HeaderSections';
import axios from 'axios';
import ProductCard from '../../products/components/ProductCard';

const RelatedProducts = ({ product }) => {
    const [relatedItems, setRelatedItems] = useState([]);
    const category = product?.category;
    useEffect(() => {
        const fetchData = async () => {
            const data = await axios.get(`https://dummyjson.com/products/category/${category}`)
            setRelatedItems(data.data.products);
        }
        fetchData();
    }, [product])
    return (
        <div className='w-[85%] mx-auto mt-14 mb-10'>
            <HeaderSections name='related item' />
            {relatedItems.length >= 1 &&
                <div className="grid grid-cols-2 lg:grid-cols-3 lgl:grid-cols-4 gap-x-4 mt-10 gap-y-10">
                    {relatedItems.map((item) => (
                        <ProductCard product={item} haveDiscount={true} />
                    ))}
                </div>
            }
        </div>
    )
}

export default RelatedProducts
