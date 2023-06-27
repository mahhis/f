import React, {FC, useContext, useEffect, useState} from 'react';
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import {MAIN_ROUTE} from "../utils/consts";
import {sendEmailCode} from "../services/auth";

const AuthForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [code, setCode] = useState<string>('');
    const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

    const { storeAuth } = useContext(Context);
    const navigate = useNavigate();


    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const storedTimer = localStorage.getItem('timer');
    const initialTimer = storedTimer !== null ? parseInt(storedTimer) : 0;
    const [timer, setTimer] = useState(initialTimer);


    useEffect(() => {
        localStorage.setItem('timer', timer.toString());
        const interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendCode = async () => {
        setButtonDisabled(true);
        setTimer(60);
        await sendEmailCode(email)
    };

    useEffect(() => {
        if (timer === 0) {
            setButtonDisabled(false);
        }
    }, [timer]);




    const handleAuth = async () => {
        if (!email || !code ) {
            alert('Введите код');
            return;
        }
        try {
            await storeAuth.auth(email, code);
            navigate(MAIN_ROUTE);
            localStorage.removeItem('timer');
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div>
            <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email"
            />
            <input
                onChange={(e) => setCode(e.target.value)}
                value={code}
                type="text"
                placeholder="Verification Code"
            />
            <button onClick={handleSendCode} disabled={isButtonDisabled}>
                {isSendingCode ? 'Sending...' : 'Send Code'}
            </button>
            {timer > 0 && (
                <p>Кнопка станет активной через {timer} секунд(ы)</p>
            )}
            <button onClick={handleAuth}> Auth</button>

        </div>
    );
};

export default observer(AuthForm);
