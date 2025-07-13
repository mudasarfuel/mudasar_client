import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  AccountBalanceWalletOutlined,
  Business,
  KeyboardArrowDown,
  MonetizationOnOutlined,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import petrolCane from "../../img/petrolCane.webp";
import dieselCane from "../../img/DieselCane.jpg";
import Avatar from "react-avatar";
import { DOMAIN } from "../../backend/API";

const Widget = ({ type, data }) => {
  // let data;

  //Temporary
  const amount = 100;
  const diff = 20;
  //Using switch to check which type of widget is it
  // switch (type) {
  //   case "users":
  //     data = {
  //       title: user.access === "web_admin" ? "TENANTS" : (user.access === "tenant_admin" || user.access === "tenant_sub_admin") && "EMPLOYEES",
  //       isMoney: false,
  //       link: user.access === "web_admin" ? "See all tenants" : (user.access === "tenant_admin" || user.access === "tenant_sub_admin") && "See all employees",
  //       icon: (
  //         <Business
  //           className="icon"
  //           style={{ color: "crimson", backgroundColor: "rgba(255, 0,0, 0.2)" }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "order":
  //     data = {
  //       title: "ORDERS",
  //       isMoney: false,
  //       link: "View all orders",
  //       icon: (
  //         <ShoppingCartOutlined
  //           className="icon"
  //           style={{
  //             color: "goldenrod",
  //             backgroundColor: "rgba(218, 165,32, 0.2)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "earning":
  //     data = {
  //       title: "EARNINGS",
  //       isMoney: true,
  //       link: "View net earnings",
  //       icon: (
  //         <MonetizationOnOutlined
  //           className="icon"
  //           style={{ color: "green", backgroundColor: "rgba(0, 218,0, 0.2)" }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "balance":
  //     data = {
  //       title: "BALANCE",
  //       isMoney: true,
  //       link: "See details",
  //       icon: (
  //         <AccountBalanceWalletOutlined
  //           className="icon"
  //           style={{
  //             color: "purple",
  //             backgroundColor: "rgba(128, 0,128, 0.2)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   default:
  //     break;
  // }
  return (
    <div className="widget" style={{background: data.stock > 0 ? "#b1f3b1" : "#ffb4b4"}}>
      <div className="left">
        <div style={{display: "flex", alignItems: "center"}}>

      <Avatar src={data.product.type !== "mobile" ? (data.product.type === "petrol" ? petrolCane : dieselCane) : (data.product.pic !== "" ?  `${DOMAIN}/public/product/images/${data.product.pic}` : './img/avatarfile.png' )} round size="30" style={{marginRight: "10px"}}/>
        <span className="title">{data.product.name}</span>
        </div>
        <span className="counter">
          {"Qty."}
          <span style={{color: data.stock > 0 ? "green": "#ff0000"}}>

            {data.stock}
          </span>
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon /> */}
          S.P Rs. {data.price.newSellingPrice}
        </div>
        <div className="percentage positive" style={{ color: "crimson" }}>
          {/* <KeyboardArrowDown /> */}
          C.P Rs. {data.price.costPrice}
        </div>
        <Business
          className="icon"
          style={{ color: "crimson", backgroundColor: "rgba(255, 0,0, 0.2)" }}
        />

      </div>
    </div>
  );
};

export default Widget;
