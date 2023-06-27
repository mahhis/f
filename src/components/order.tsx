import React, {FC, useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {createOrder} from "../services/order";
import {useNavigate} from "react-router-dom";
import {Context} from "../index";
import {ORDER_ROUTE} from "../utils/consts";


const OrderForm: FC = () => {
    const [cardNumberSender, setCardNumberSender] = useState<string>('');
    const [cardNumberGetter, setCardNumberGetter] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    const navigate = useNavigate();

    const {storeAuth} = useContext(Context)
    const handlePayment = async () => {

        if (!cardNumberSender || !cardNumberGetter || !amount) {
            alert('Введите получателя и сумму перевода');
            return;
        }

        try {
            const response =await createOrder(storeAuth.user._id, cardNumberSender, cardNumberGetter, amount)
            const orderId = response.data._id;
            navigate(ORDER_ROUTE.replace(':id', orderId));
        } catch (error) {
            alert('Ошибка при выполнении перевода: ' );
        }
    };



    return (
        <div>
            <input
                onChange={(e) => setCardNumberSender(e.target.value)}
                value={cardNumberSender}
                type="text"
                placeholder="Your card"
            />
            <input
                onChange={(e) => setCardNumberGetter(e.target.value)}
                value={cardNumberGetter}
                type="text"
                placeholder="Recipient card"
            />
            <input
                onChange={(e) => setAmount(parseFloat(e.target.value))}
                value={amount}
                type="number"
                step="0.01"
                min="0"
            />
            <button onClick={handlePayment}>Order</button>
        </div>
    );
};
export default observer(OrderForm);