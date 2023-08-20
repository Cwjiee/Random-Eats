import { auth } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { usetoast } from "@chakra-ui/react";

export default function Profile() {
  const toast = useToast();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast({ title: "Logout successfully", status: "success" });
    } catch (error) {
      console.error("Error while logging out:", error);
    }
  };

  const login = () => {
    router.push("/login");
  };

  return <div>nothing</div>;
}
