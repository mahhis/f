import $api from "../http";
import {OrderResponse} from "../models/response/order";
import {IUser} from "../models/IUser";
import {OrdersResponse} from "../models/response/orders";
import {OrderInfoResponse} from "../models/response/info";

export async function createOrder(userId:string, cardNumberSender: string, cardNumberGetter: string, amount:number){

    return await $api.post<OrderResponse>('/order/create', {userId, cardNumberSender, cardNumberGetter, amount});
}

export async function fetchOrders(id:string){
    return await $api.get<OrdersResponse>(`/order/orders/${id}`);
}
export async function fetchOrderInfo(id:string){

    return await $api.get<OrderInfoResponse>(`/order/info/${id}`);
}

