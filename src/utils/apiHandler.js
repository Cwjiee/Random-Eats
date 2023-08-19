import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs
} from "firebase/firestore";

export const apiHandler = (() => {
  
  const addUserChoices = async (user, choice ) => {
    try{
      const restaurantRef = await addDoc(collection(db, "restaurants"), {
        user_id: user.id,
        name: choice.name,
        halal: choice.halal,
      });
      
      const userSnapshot = await getDoc(doc(db, "users", user.id));
      const userRestaurants =
        userSnapshot.data() === undefined ||
        userSnapshot.data().restaurants === undefined
          ? []
          : userSnapshot.data().restaurants;

      userRestaurants.push(restaurantRef.id);

      await setDoc(doc(db, "users", user.id), {
        restaurants: userRestaurants,
      });
      
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const getUserChoices = async (user_id) => {
    const userSnapshot = await getDoc(doc(db, "users", user_id));
    const userRestaurants =
      userSnapshot.data() === undefined ||
      userSnapshot.data().restaurants === undefined
        ? []
        : userSnapshot.data().restaurants;

    const restaurants = [];
    for (const restaurantId of userRestaurants) {
      const restaurantSnapshot = await getDoc(
        doc(db, "restaurants", restaurantId)
      );
      restaurants.push(restaurantSnapshot.data());
    }

    return restaurants;
  }

  const getRestaurant = async (restaurantName) => {
    const q = query(collection(db, "restaurants"), where("name", "==", restaurantName))
    const results = await getDocs(q);
    for (const doc of results.docs) {
      return doc.data();
    }
  }

  return {
    addUserChoices,
    getUserChoices,
    getRestaurant,
  }
})();