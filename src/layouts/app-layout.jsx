import Header from "@/components/header";
import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <Header/>
      <main  className="min-h-screen p-10">
        <Outlet/>
      </main>
      <div className="p-10 text-center text-blue-900 bg-lime-300 mt-10 font-bold text-xl">
        Developed by {" "}
        <a 
          href="https://github.com/AnishPillai2002" 
          className="text-blue-600 hover:text-green-800 "
        >
          Anish Pillai
        </a>
      </div>
    </div>
  );
};

export default AppLayout;