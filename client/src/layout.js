import React from "react";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/footer.js";

function Layout({ children }) {
  return (
    <div className="flex flex-col w-full min-h-screen justify-between bg-[#f8fafc]">
      <Navbar />
      <main className="flex-grow w-full flex flex-col items-center">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
