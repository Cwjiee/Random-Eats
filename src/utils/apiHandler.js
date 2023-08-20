import { db } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";

export const apiHandler = (() => {
  const addUserChoices = async (user, choice) => {
    try {
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
        name: user.name,
        restaurants: userRestaurants,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
  };

  const getUserChoicesByName = async (username) => {
    const name = username.toUpperCase();
    const q = query(collection(db, "users"), where("name", "==", name));

    const results = await getDocs(q);
    for (const doc of results.docs) {
      return doc.data();
    }
  };

  const getRestaurant = async (restaurantName) => {
    const q = query(
      collection(db, "restaurants"),
      where("name", "==", restaurantName)
    );
    const results = await getDocs(q);
    for (const doc of results.docs) {
      return doc.data();
    }
  };

  const getUsers = async () => {
    const q = query(collection(db, "users"));
    const results = await getDocs(q);
    const users = [];
    for (const doc of results.docs) {
      users.push(doc.data());
    }
    return users;
  };

  return {
    addUserChoices,
    getUserChoices,
    getRestaurant,
    getUsers,
    getUserChoicesByName
  };
})();
