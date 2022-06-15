import { LoginPage, SignUpPage } from "../components/login&signUp";
import { DetailProduct, ProductPage } from "../components/ProductPage";
import { CartPage } from "../components/CartPage";
import { AdminPage } from "../components/AdminPage";
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
