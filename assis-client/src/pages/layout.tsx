import { Footer, Header } from "@components";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <>
      <Header />

      <main className="h-[98vh]">
        <Outlet />
      </main>

     
    </>
  );
};
