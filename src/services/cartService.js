import { db } from "../firebase";
import { collection, getDocs, doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

export const addProductToCart = (product) => {
    const uid = localStorage.getItem("user_id");
    const cartCollectionRef = doc(db, "cart", `${uid}/products/${product.id}`);

    return setDoc(cartCollectionRef, product)
        .then(() => "Product added to cart successfully")
        .catch((error) => {
            console.error(error);
            throw new Error("Product not added to cart");
        });
}

export const getCartProducts = async () => {
    const uid = localStorage.getItem("user_id");
    const cartCollectionRef = collection(db, 'cart', `${uid}/products`);
    const cartList = [];
    
    const cartSnapshot = await getDocs(cartCollectionRef);
    cartSnapshot.docs.forEach(doc => cartList.push({ ...doc.data(), id: doc.id }));

    return cartList;
}

export const increaseProductQuantity = async (productId) => {
    const uid = localStorage.getItem("user_id");
    const cartProductRef = doc(db, 'cart', `${uid}/products/${productId}`);
    
    const cartSnapshot = await getDoc(cartProductRef);
    const cartData = cartSnapshot.data();
    const cartQuantity = cartData.quantity;
    
    await updateDoc(cartProductRef, { quantity: cartQuantity + 1 });

    return "Updated";
}

export const decreaseProductQuantity = async (productId) => {
    const uid = localStorage.getItem("user_id");
    const cartProductRef = doc(db, 'cart', `${uid}/products/${productId}`);
    
    const cartSnapshot = await getDoc(cartProductRef);
    const cartData = cartSnapshot.data();
    const cartQuantity = cartData.quantity;
    
    if (cartQuantity > 1) {
        await updateDoc(cartProductRef, { quantity: cartQuantity - 1 });
    } else {
        await deleteItemFromCart(productId);
    }

    return "Updated";
}

export const deleteItemFromCart = async (productId) => {
    const uid = localStorage.getItem("user_id");
    const cartProductRef = doc(db, 'cart', `${uid}/products/${productId}`);

    await deleteDoc(cartProductRef);

    return "Deleted";
}
