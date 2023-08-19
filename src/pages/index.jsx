import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebaseConfig";
import { useEffect } from "react";
import router from "next/router";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

export default function Home() {
  const googleAuth = new GoogleAuthProvider();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(()=> {
  //   if (user){
  //     router.push('')
  //   }
  // })

  return (
    <>
      <div>home</div>
      <button onClick={googleLogin}>login</button>
    </>
  )
}
