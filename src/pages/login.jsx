import { auth } from "../../firebaseConfig";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import router from "next/router";
import { Center, Spinner } from "@chakra-ui/react";

export default function Login(){
  const googleAuth = new GoogleAuthProvider();
  const [user, loading, error] = useAuthState(auth);
  const googleLogin = async () => {
    try {
      await signInWithRedirect(auth, googleAuth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user]);
  
  return (
    <>
    {loading ? (
        <Center mt="300px">
          <Spinner
            thickness="8px"
            speed="0.65s"
            emptyColor="gray.200"
            color="#3e3bf5"
            boxSize={20}
          />
        </Center>
      ) :
      <button onClick={googleLogin}>login</button>
    }
    </>
  );
}