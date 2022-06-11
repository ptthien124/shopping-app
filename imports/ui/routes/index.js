import AdminPage from "../components/AdminPage";
import CartPage from "../components/CartPage";
import LoginPage from "../components/login&signUp/LoginPage";
import SignUpPage from "../components/login&signUp/SignUpPage";
import ProductPage from "../components/ProductPage";
import DetailProduct from "../components/ProductPage/DetailProduct";
import { PureLayout } from "../layouts";

const publicRoutes = [
  { path: "/login", component: LoginPage, layout: PureLayout },
  { path: "/signUp", component: SignUpPage, layout: PureLayout },
  {
    path: "/:id",
    component: DetailProduct,
    layout: null,
  },
  {
    path: "/",
    component: ProductPage,
    layout: null,
  },
];

const privateRoutes = [
  {
    path: "/cart",
    component: CartPage,
    layout: null,
  },
];

const adminRoutes = [
  {
    path: "/admin",
    component: AdminPage,
    layout: null,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
