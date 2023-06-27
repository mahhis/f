import $api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/auth";


    export async function auth(email: string, code: string):Promise<AxiosResponse<AuthResponse>> {
    return await $api.post<AuthResponse>('/auth', {email, code})
}

    export async function logout(): Promise<void> {
        return await $api.post('/auth/logout')
    }

    export async function sendEmailCode(email: string): Promise<void> {
        return await $api.post('/auth/email', {email})
    }

    export async function checkAuth():Promise<AxiosResponse<AuthResponse>> {
        return await $api.get<AuthResponse>('/auth/refresh', {withCredentials: true})
    }
