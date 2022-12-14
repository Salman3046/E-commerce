import React, { lazy } from "react";

// MUI Icons
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import GroupIcon from "@mui/icons-material/Group";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import SettingsIcon from "@mui/icons-material/Settings";
import LayersIcon from "@mui/icons-material/Layers";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import HelpIcon from "@mui/icons-material/Help";
import QuizIcon from "@mui/icons-material/Quiz";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SyncIcon from "@mui/icons-material/Sync";

const Welcome = lazy(() => import("./Welcome"));
const AddCategory = lazy(() => import("../Pages/Categories/AddCategory"));
const ViewCategory = lazy(() => import("../Pages/Categories/ViewCategory"));
const EditCategory = lazy(() => import("../Pages/Categories/EditCategory"));
const AddSubCategory = lazy(() =>
  import("../Pages/SubCategories/AddSubCategory")
);
const ViewSubCategory = lazy(() =>
  import("../Pages/SubCategories/ViewSubCategory")
);
const EditSubCategory = lazy(() =>
  import("../Pages/SubCategories/EditSubCategory")
);
const ViewBrand = lazy(() => import("../Pages/Brands/ViewBrand"));
const AddBrand = lazy(() => import("../Pages/Brands/AddBrand"));
const EditBrand = lazy(() => import("../Pages/Brands/EditBrand"));
const ViewAttribute = lazy(() => import("../Pages/Attributes/ViewAttribute"));
const AddAttribute = lazy(() => import("../Pages/Attributes/AddAttribute"));
const EditAttribute = lazy(() => import("../Pages/Attributes/EditAttribute"));
const AddProduct = lazy(() => import("../Pages/Products/AddProduct"));
const ViewProducts = lazy(() => import("../Pages/Products/ViewProducts"));
const EditProduct = lazy(() => import("../Pages/Products/EditProduct"));
const ViewUsers = lazy(() => import("../Pages/Users/ViewUsers"));
const ViewOrders = lazy(() => import("../Pages/Order/ViewOrders"));
const ViewRequests = lazy(() => import("../Pages/ReturnRequests/ViewRequests"));
const EditRequest = lazy(() => import("../Pages/ReturnRequests/EditRequest"));
const EditOrder = lazy(() => import("../Pages/Order/EditOrder"));
const ViewPayments = lazy(() => import("../Pages/Payments/ViewPayments"));
const EditPayment = lazy(() => import("../Pages/Payments/EditPayment"));
const ViewCoupons = lazy(() => import("../Pages/Coupons/ViewCoupons"));
const AddCoupon = lazy(() => import("../Pages/Coupons/AddCoupon"));
const EditCoupon = lazy(() => import("../Pages/Coupons/EditCoupon"));
const Settings = lazy(() => import("../Pages/Settings/Settings"));
const About = lazy(() => import("../Pages/CustomPages/About"));
const PrivacyPolicy = lazy(() => import("../Pages/CustomPages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("../Pages/CustomPages/RefundPolicy"));
const TermsConditions = lazy(() =>
  import("../Pages/CustomPages/TermsConditions")
);
const ViewSliders = lazy(() => import("../Pages/HomePageSettings/ViewSliders"));
const AddSlider = lazy(() => import("../Pages/HomePageSettings/AddSlider"));
const EditSlider = lazy(() => import("../Pages/HomePageSettings/EditSlider"));
const AdminProfile = lazy(() => import("../Pages/AdminProfile/index"));
const Help = lazy(() => import("../Pages/Help/Help"));
const AddFaq = lazy(() => import("../Pages/Faqs/AddFaq"));
const ViewFaqs = lazy(() => import("../Pages/Faqs/ViewFaqs"));
const EditFaq = lazy(() => import("../Pages/Faqs/EditFaq"));

const sidebar = [
  {
    enabled: true,
    path: "welcome",
    navbar: "Dashboard",
    icon: <DashboardIcon />,
    child: null,
  },
  {
    enabled: true,
    navbar: "Category",
    icon: <CategoryIcon />,
    child: [
      {
        name: "Category",
        path: "category",
      },
      {
        name: "Subcategory",
        path: "sub-category",
      },
    ],
  },
  {
    enabled: true,
    navbar: "Attributes",
    icon: <FormatListBulletedIcon />,
    child: [
      {
        name: "Brand",
        path: "brands",
      },
      {
        name: "Attribute",
        path: "attributes",
      },
    ],
  },
  {
    enabled: true,
    navbar: "Homepage",
    icon: <AutoFixHighIcon />,
    child: [
      {
        name: "Sliders",
        path: "sliders",
      },
    ],
  },
  {
    enabled: true,
    navbar: "Products",
    icon: <InventoryIcon />,
    path: "products",
    child: null,
  },
  {
    enabled: true,
    navbar: "Orders",
    icon: <LocalGroceryStoreIcon />,
    path: "orders",
    child: null,
  },
  {
    enabled: true,
    navbar: "Return Orders",
    icon: <SyncIcon />,
    path: "return-requests",
    child: null,
  },
  {
    enabled: true,
    navbar: "Customers",
    icon: <GroupIcon />,
    path: "users",
    child: null,
  },
  {
    enabled: true,
    navbar: "Helps",
    icon: <HelpIcon />,
    path: "helps",
    child: null,
  },
  {
    enabled: true,
    navbar: "Payments",
    icon: <AttachMoneyIcon />,
    path: "payments",
    child: null,
  },
  {
    enabled: true,
    navbar: "Coupons",
    icon: <CardGiftcardIcon />,
    path: "coupons",
    child: null,
  },
  {
    enabled: true,
    navbar: "Settings",
    icon: <SettingsIcon />,
    path: "settings",
    child: null,
  },
  {
    enabled: true,
    navbar: "Faqs",
    icon: <QuizIcon />,
    path: "faqs",
    child: null,
  },
  {
    enabled: true,
    navbar: "Pages",
    icon: <LayersIcon />,
    path: "pages",
    child: [
      {
        name: "About",
        path: "custom-pages/about",
      },
      {
        name: "Privacy Policy",
        path: "custom-pages/privacy-policy",
      },
      {
        name: "Return Policy",
        path: "custom-pages/return-policy",
      },
      {
        name: "Terms Conditions",
        path: "custom-pages/terms-conditions",
      },
    ],
  },
];

export const AdminRoutes = [
  {
    enabled: true,
    path: "welcome",
    element: <Welcome />,
  },
  {
    enabled: true,
    path: "category/add-category",
    element: <AddCategory />,
  },
  {
    enabled: true,
    path: "category",
    element: <ViewCategory />,
  },
  {
    enabled: true,
    path: "category/edit-category/:id",
    element: <EditCategory />,
  },
  {
    enabled: true,
    path: "sub-category/add-sub-category",
    element: <AddSubCategory />,
  },
  {
    enabled: true,
    path: "sub-category",
    element: <ViewSubCategory />,
  },
  {
    enabled: true,
    path: "sub-category/edit-sub-category/:id",
    element: <EditSubCategory />,
  },
  {
    enabled: true,
    path: "brands/add-brand",
    element: <AddBrand />,
  },
  {
    enabled: true,
    path: "brands",
    element: <ViewBrand />,
  },
  {
    enabled: true,
    path: "brands/edit-brand/:id",
    element: <EditBrand />,
  },
  {
    enabled: true,
    path: "attributes/add-attribute",
    element: <AddAttribute />,
  },
  {
    enabled: true,
    path: "attributes",
    element: <ViewAttribute />,
  },
  {
    enabled: true,
    path: "attributes/edit-attribute/:id",
    element: <EditAttribute />,
  },
  {
    enabled: true,
    path: "products/add-product",
    element: <AddProduct />,
  },
  {
    enabled: true,
    path: "products",
    element: <ViewProducts />,
  },
  {
    enabled: true,
    path: "orders",
    element: <ViewOrders />,
  },
  {
    enabled: true,
    path: "orders/edit-order/:id",
    element: <EditOrder />,
  },
  {
    enabled: true,
    path: "return-requests",
    element: <ViewRequests />,
  },
  {
    enabled: true,
    path: "return-requests/edit-return-request/:id",
    element: <EditRequest />,
  },
  {
    enabled: true,
    path: "products/edit-product/:id",
    element: <EditProduct />,
  },
  {
    enabled: true,
    path: "users",
    element: <ViewUsers />,
  },
  {
    enabled: true,
    path: "helps",
    element: <Help />,
  },
  {
    enabled: true,
    path: "payments",
    element: <ViewPayments />,
  },
  {
    enabled: true,
    path: "payments/edit-payment/:id",
    element: <EditPayment />,
  },
  {
    enabled: true,
    path: "coupons",
    element: <ViewCoupons />,
  },
  {
    enabled: true,
    path: "coupons/add-coupon",
    element: <AddCoupon />,
  },
  {
    enabled: true,
    path: "coupons/edit-coupon/:id",
    element: <EditCoupon />,
  },
  {
    enabled: true,
    path: "settings",
    element: <Settings />,
  },
  {
    enabled: true,
    path: "custom-pages/about",
    element: <About />,
  },
  {
    enabled: true,
    path: "custom-pages/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    enabled: true,
    path: "custom-pages/return-policy",
    element: <RefundPolicy />,
  },
  {
    enabled: true,
    path: "custom-pages/terms-conditions",
    element: <TermsConditions />,
  },
  {
    enabled: true,
    path: "sliders",
    element: <ViewSliders />,
  },
  {
    enabled: true,
    path: "sliders/add-slider",
    element: <AddSlider />,
  },
  {
    enabled: true,
    path: "sliders/edit-slider/:id",
    element: <EditSlider />,
  },
  {
    enabled: true,
    path: "admin/profile",
    element: <AdminProfile />,
  },
  {
    enabled: true,
    path: "faqs",
    element: <ViewFaqs />,
  },
  {
    enabled: true,
    path: "faqs/add-faq",
    element: <AddFaq />,
  },
  {
    enabled: true,
    path: "faqs/edit-faq/:id",
    element: <EditFaq />,
  },
];

export default sidebar.filter((side) => side.enabled);
