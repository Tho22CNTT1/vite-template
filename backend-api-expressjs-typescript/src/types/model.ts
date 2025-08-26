// src/types/model.ts

import { ObjectId } from "mongoose";

export type TCustomer = {
    _id: ObjectId;
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip_code?: string;
    password?: string;
};

export interface ICategoryCreate {
    category_name: string;
    description: string;
}

export interface IStaffEntity {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    password: string;
    active: boolean;
    roles: string[];
}

export interface TStaff extends IStaffEntity {
    _id: string;
    id: string;
    createdAt: Date;
    updateAt: Date;

}

export enum EnumOrderStatus {
    Pending = "pending",
    Confirmed = "confirmed",
}
