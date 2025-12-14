import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";
import NavBar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";

export default function MainLayout() {
  return (
    <div className='flex flex-col min-h-screen items-center p-1'>
      <Header />
      <NavBar />
      <div className='flex-1 w-full max-w-[1200px] flex flex-col'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
