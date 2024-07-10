
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const fetchProducts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return productsData;
  } catch (error) {
    console.error('Error fetching products: ', error);
    throw error;
  }
};

export default fetchProducts;
