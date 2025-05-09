import Navbar from "@/components/Home/Navbar";
import {Outlet} from "react-router-dom";

const AppShell = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};

export default AppShell;