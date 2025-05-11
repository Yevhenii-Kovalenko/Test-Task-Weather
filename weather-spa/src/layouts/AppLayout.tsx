import { Outlet } from "react-router";

const AppLayout = () => {
  return (
    <div className="layout">
      <Outlet />
    </div>
  );
};

export default AppLayout;
