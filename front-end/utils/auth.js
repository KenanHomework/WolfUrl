import store from "../stores";
import { useSelector } from "react-redux";
import { signIn, logOut as logOutStore } from "@/stores/auth";
import { logOut } from "@/services/auth";

export const useAuthData = () => useSelector((state) => state.auth.auth);

export const useId = () => useSelector((state) => state.auth.auth.id);

export const useUserEmail = () => useSelector((state) => state.auth.auth.email);

export const useUserUsername = () =>
  useSelector((state) => state.auth.auth.username);

export const useUserSignedIn = () =>
  useSelector((state) => state.auth.auth.userSignedIn);

export const signInUser = (userData) =>
  store.dispatch(signIn({ result: userData }));

export const logOutUser = () => {
  store.dispatch(logOutStore());
};

export async function logOutScenario() {
  await logOut();
  logOutUser();
  window.location.reload();
}
