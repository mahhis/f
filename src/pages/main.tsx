import React, {useContext} from 'react';
import OrderForm from "../components/order";
import {Link} from "react-router-dom";
import {AUTH_ROUTE, ORDERS_ROUTE} from "../utils/consts";
import {Context} from "../index";


const MainPage = () => {
    const {storeAuth} = useContext(Context)
    return (
        <div className="main-page d-flex justify-content-center align-items-center">
            <div className="order-form-container">
                <OrderForm />
            </div>
            {!storeAuth.isAuth? (
            <div className="authorization-info">
                <p>
                    If you don't authorize, you won't be notified about the order completion.
                    Please <Link to={AUTH_ROUTE}>log in</Link> to stay updated.
                </p>
            </div>): (<h1></h1>)
            }
            <Link to={ORDERS_ROUTE}>К заказам</Link>
        </div>
    );
};

export default MainPage;
