import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom'
import {AUTH_ROUTE, ERROR_ROUTE, MAIN_ROUTE, ORDER_ROUTE, ORDERS_ROUTE} from "../utils/consts";
import AuthPage from "../pages/auth";
import MainPage from "../pages/main";
import OrderPage from "../pages/order";
import OrdersPage from "../pages/orders";

const AppRouter = () => {

    return (
        <Routes>
            <Route  path={AUTH_ROUTE} element={<AuthPage/>} />
            <Route  path={MAIN_ROUTE} element={<MainPage/>} />
            <Route  path={ORDER_ROUTE} element={<OrderPage/>} />
            <Route  path={ORDERS_ROUTE} element={<OrdersPage/>} />
            <Route  path={ERROR_ROUTE} element={<OrdersPage/>} />
            <Route path="*" element={<Navigate to={MAIN_ROUTE} />} />
        </Routes>
    );
};

export default AppRouter;
