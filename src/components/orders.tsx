import React, {FC, useContext, useEffect, useState} from 'react';
import { observer } from "mobx-react-lite";
import {Link, useNavigate, useParams} from "react-router-dom";
import {MAIN_ROUTE, ORDER_ROUTE} from "../utils/consts";
import { fetchOrders } from "../services/order";
import { IOrder } from "../models/IOrder";
import {Context} from "../index";

const Orders: FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { storeAuth } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (storeAuth.user._id === undefined) {
            navigate(MAIN_ROUTE);
        } else {
            fetchOrders(storeAuth.user._id).then((response) => {
                const orders =response.data.orders
                setOrders(orders);
            });
        }
    }, [storeAuth.user._id, navigate]);

    return (
        <div>
            <h2>Список заказов</h2>
            {orders.map((order) => (
                <Link key={order.id} to={`${ORDER_ROUTE}/${order.id}`}>
                    <div>
                        <p>Link: {order.transferLink}</p>
                        <p>Amount: {order.amountAndCheckSum}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default observer(Orders);
