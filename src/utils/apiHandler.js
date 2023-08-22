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
  deleteDoc,
} from "firebase/firestore";

export const apiHandler = (() => {
  const addUserChoices = async (user, choice) => {
    try {
      const restaurantRef = await addDoc(collection(db, "restaurants"), {
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

  const addExistingChoice = async (user, choice) => {
    try {
      console.log(choice);
      const restaurantSnapshot = await getDoc(
        doc(db, "restaurants", choice.id)
      );
      console.log(restaurantSnapshot);

      const userSnapshot = await getDoc(doc(db, "users", user.id));
      const userRestaurants =
        userSnapshot.data() === undefined ||
        userSnapshot.data().restaurants === undefined
          ? []
          : userSnapshot.data().restaurants;

      console.log(restaurantSnapshot);
      userRestaurants.push(restaurantSnapshot.id);
      console.log(userRestaurants);

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
      return doc;
    }
  };

  const getRestaurantFromId = async (id) => {
    const restaurantSnapshot = await getDoc(doc(db, "restaurants", id));
    return restaurantSnapshot.data();
  };

  const getUsers = async () => {
    const q = query(collection(db, "users"));
    const results = await getDocs(q);
    const users = [];
    for (const doc of results.docs) {
      users.push(doc);
    }
    return users;
  };

  const getRestaurants = async () => {
    const q = query(collection(db, "restaurants"));
    const result = await getDocs(q);
    const restaurants = [];
    for (const doc of result.docs) {
      restaurants.push(doc.data());
    }
    return restaurants;
  };

  const deleteRestaurant = async (restaurantName) => {
    const restaurant = await getRestaurant(restaurantName);
    await deleteDoc(doc(db, "restaurants", restaurant.id));

    const users = await getUsers();
    for (const user of users) {
      const userSnapshot = await getDoc(doc(db, "users", user.id));
      const userRestaurants =
        userSnapshot.data() === undefined ||
        userSnapshot.data().restaurants === undefined
          ? []
          : userSnapshot.data().restaurants;

      const filtered = userRestaurants.filter((id) => id !== restaurant.id);

      await setDoc(doc(db, "users", user.id), {
        name: user.data().name,
        restaurants: filtered,
      });
    }
  };

  return {
    addUserChoices,
    getUserChoices,
    getRestaurant,
    getUsers,
    getUserChoicesByName,
    getRestaurants,
    addExistingChoice,
    getRestaurantFromId,
    deleteRestaurant,
  };
})();
