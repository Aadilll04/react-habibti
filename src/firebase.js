import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyC62ozTHapqlzkEw784UkfACq6YRQ5Db0s",
    authDomain: "ecommerce-website-92db4.firebaseapp.com",
    projectId: "ecommerce-website-92db4",
    storageBucket: "ecommerce-website-92db4.appspot.com",
    messagingSenderId: "273535440983",
    appId: "1:273535440983:web:59825b04af85fd61512b12"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };



