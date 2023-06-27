import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {useNavigate, useParams} from "react-router-dom";
import {fetchOrderInfo} from "../services/order";
import {MAIN_ROUTE} from "../utils/consts";

const OrderInfo: FC = () => {

    const [order, setOrder] = useState(
        {
            amountAndCheckSum:'',
            transferLink: '',
            cardNumber: ''
        }
    )
    const {id} = useParams()
    const navigate = useNavigate();
    useEffect(() => {
        if(id===undefined){
            navigate(MAIN_ROUTE);
        }
        fetchOrderInfo(id!).then((response) => {
            const data = response.data
            setOrder(data)
        })
    }, [])

    const handleCopyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied to clipboard:', text);
            })
            .catch((error) => {
                console.error('Failed to copy to clipboard:', error);
            });
    };

    return (
        <div>
            <h3> tuda suda</h3>
            <a href={order.transferLink} target="_blank" rel="noopener noreferrer">
                {order.transferLink}
            </a>
            <h3>
                Amount and Check Sum: {order.amountAndCheckSum}
                <button onClick={() => handleCopyToClipboard(order.cardNumber)}>
                    Copy to Clipboard
                </button>
            </h3>
            <h3>
                Card Number: {order.cardNumber}
                <button onClick={() => handleCopyToClipboard(order.cardNumber)}>
                    Copy to Clipboard
                </button>
            </h3>
        </div>
    );
};
export default observer(OrderInfo);