import { BrowserRouter, Route, Routes,Switch } from "react-router-dom";
import "./App.css";
import WebFont from "webfontloader";
import { useState,useEffect } from "react";
import Home from "./components/Home/Home";
import Products from "./components/product/Products";
import Footer from "./components/layout/Footer/Footer";
import Headers from "./components/layout/Header/Headers";
import Loader from "./components/layout/Loader/Loader";
import ProductDetails from "./components/product/ProductDetails";
import Search from "./components/product/Search";
import LoginSignUp from "./components/User/AllLogReg";


import store from "./Store"
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import OrderDetails from "./components/Order/OrderDetails";
import NotFound from "./components/layout/Not Found/NotFound";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import UsersList from "./components/Admin/UsersList";
import OrderList from "./components/Admin/OrderList";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CurrentUser from "./components/CurrentUser";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
const baseURL = process.env.REACT_APP_SERVER_URL;
  async function getStripeApiKey() {
    const { data } = await axios.get(
      `${baseURL}/api/v1/stripeapikey`
    );

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
  
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault());
  
  const currentUser = sessionStorage.getItem("currentUserPack")
    ? JSON.parse(sessionStorage.getItem("currentUserPack"))
    : {};
  //console.log(currentUser)
     
  
  return (
    <>
      <BrowserRouter>
        <Headers />
        {currentUser && (<UserOptions user={currentUser} />)}
        {stripeApiKey && (
          <Elements stripe={loadStripe(stripeApiKey)}>
            <ProtectedRoute exact path="/process/payment" component={Payment} />
          </Elements>
        )}
        <Switch>
          <Route exact path="/" component={ Home} />
          <Route exact path="/products" component={Products} />
          <Route exact path="/product/:id" component={ProductDetails} />

          <Route path="/products/:keyword" component={Products} />

          <Route exact path="/search" component={Search} />

          <Route exact path="/contact" component={Contact} />

          <Route exact path="/about" component={About} />

          <Route exact path="/account" component={Profile} />
          <Route exact path="/account/:id" component={Profile} />
          <ProtectedRoute exact path="/me/update" component={UpdateProfile} />

          <ProtectedRoute exact path="/password/update" component={UpdatePassword} />
          <Route exact path="/password/forgot" component={ForgotPassword} />

          <Route exact path="/password/reset/:token" component={ResetPassword} />

          <Route exact path="/login" component={LoginSignUp} />
          <Route path="/login" component={LoginSignUp} />
          <Route exact path="/cart" component={Cart} />
          <ProtectedRoute
            isAdmin={true}
            exact
            path="/admin/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute
            exact
            path="/admin/products"
            
            component={ProductList}
          />
          <ProtectedRoute
            exact
            path="/admin/product"
           
            component={NewProduct}
          />

          <ProtectedRoute
            exact
            path="/admin/product/:id"
            
            component={UpdateProduct}
          />
          <ProtectedRoute
            exact
            path="/admin/orders"
            
            component={OrderList}
          />

          <ProtectedRoute
            exact
            path="/admin/order/:id"
           
            component={ProcessOrder}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
          
            component={UsersList}
          />

          <ProtectedRoute
            exact
            path="/admin/user/:id"
           
            component={UpdateUser}
          />

          <ProtectedRoute
            exact
            path="/admin/reviews"
            
            component={ProductReviews}
          />
          <ProtectedRoute exact path="/shipping" component={Shipping} />
          <ProtectedRoute exact path="/success" component={OrderSuccess} />

          <ProtectedRoute exact path="/orders" component={MyOrders} />

          <ProtectedRoute exact path="/order/confirm" component={ConfirmOrder} />
          <ProtectedRoute exact path="/order/:id" component={OrderDetails} />

          {/* <Route
            component={window.location.pathname === "/process/payment" ? null : NotFound}
          /> */}
        </Switch>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
