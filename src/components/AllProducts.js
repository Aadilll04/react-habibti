import React, { useState, useEffect } from 'react';
import { db} from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import Product from './Product'; 



const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
        setError(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
     {products.map(product => (
        <Product
          key={product.id}
          id={product.id}
          image={product.image}
          name={product.name}
          description={product.description}
          price={product.price}
        />
      ))}
    </>
  );
};

export default AllProducts;
