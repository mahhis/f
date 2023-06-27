import React, {createContext} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import StoreAuth from "./store/auth";


interface State {
    storeAuth: StoreAuth
}

export const storeAuth = new StoreAuth();



export const Context = createContext<State>({
    storeAuth
})

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <Context.Provider value={{
        storeAuth
    }}>
        <App />
    </Context.Provider>
);
