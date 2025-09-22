import Navbar from "./components/Navbar";
import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Outlet,
  Route,
} from "react-router-dom";
import Contact from "./pages/contact/Contact";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import SignUp from "./pages/signup/SignUp";
import AppProvider from "./context/AppContext";
import Footer from "./components/Footer";
import Login from "./pages/signup/Login";
import WishList from "./pages/wishlist/WishList";
import Cart from "./pages/cart/Cart";
import CheckOut from "./pages/cart/CheckOut";
import Products from "./pages/products/Products";
import ProductDetails from "./pages/productdetails/ProductDetails";
import NotFound from "./pages/notfound/NotFound";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [])
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/products" element={<Products />} />
          <Route path={`/products/:id`} element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Route>
    )
  );
  return (
    <>
      {
        loading ? <div className="h-[100vh] flex items-center justify-center"><ClipLoader className="absolute" color="#db4444" size={50} /></div> :
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
      }

    </>
  );
}

export default App;
