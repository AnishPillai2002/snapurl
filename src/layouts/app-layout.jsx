import {Outlet} from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Outlet />
      </main>
      <div className="p-10 text-center bg-lime-300 mt-10">
        Made with 💗 by Anish Technologies
      </div>
    </div>
  );
};

export default AppLayout;