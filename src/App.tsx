import React, {FC, useContext, useEffect, useState} from 'react';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";

const App: FC = () => {
  const {storeAuth} = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
        storeAuth.checkAuth()
    }
  }, [storeAuth])

  if (storeAuth.isLoading) {
    return <div>Loading...</div>
  }

  return (
      <BrowserRouter>
          <AppRouter/>
      </BrowserRouter>
  );
};

export default observer(App);