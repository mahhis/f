import Info from "../components/info";
import OrderInfo from "../components/info";
import React, {useContext} from "react";
import {Link, useNavigate} from "react-router-dom";
import {MAIN_ROUTE, ORDER_ROUTE, ORDERS_ROUTE} from "../utils/consts";
import {createOrder} from "../services/order";
import {Context} from "../index";

const OrderPage = () => {

    return (
        <div>
            <OrderInfo />
            <Link to={MAIN_ROUTE}>На главную</Link>
            <Link to={ORDERS_ROUTE}>К заказам</Link>
        </div>
    );
};

export default OrderPage;