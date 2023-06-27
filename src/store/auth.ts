import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import {auth, logout, checkAuth, sendEmailCode} from "../services/auth";


export default class StoreAuth{
    user = {} as IUser;
    isAuth :boolean = false;
    isLoading:boolean = false;


    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }


    async auth(email: string, code: string) {
        try {
            const response = await auth(email, code);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {

            // @ts-ignore

            console.log(e.response?.data?.message);

        }
    }
    async logout() {
        try {
            await logout();
            localStorage.removeItem('accessToken');
            this.setAuth(false);
            this.setUser({} as IUser);
        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        }
    }



    async checkAuth() {

        this.setLoading(true);
        try {
            const response = await checkAuth()
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);

        } catch (e) {
            // @ts-ignore
            console.log(e.response?.data?.message);
        } finally {

            this.setLoading(false);
        }
    }
}