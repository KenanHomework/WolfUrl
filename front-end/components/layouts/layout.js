"use client";
import Header from "@/components/layouts/components/header";
import LayoutContainer from "@/components/layouts/components/layout-container";
import store from "@/stores";
import { Provider } from "react-redux";

export default function Layout({ children }) {
  return (
    <Provider store={store}>
      <LayoutContainer>
        <Header />
        <main className={"w-full h-[calc(100%-64px)]"}>{children}</main>
      </LayoutContainer>
    </Provider>
  );
}
