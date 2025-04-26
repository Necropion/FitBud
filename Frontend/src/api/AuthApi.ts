import { Gateway } from "@/types/Gateway";
import { PassThrough } from "stream";

export const authenticateUser = async (gateway: Gateway, email: string, password: string) => {

    const authCheck = await fetch(`${gateway.authentication}user/authenticate/`, {
        method: "POST",
        body: JSON.stringify({
            Email: email,
            Password: password
        }),
        headers: {
            "Content-Type":"application/json",
        },
    });
    const response = await authCheck.json();

    if (authCheck.ok) {
        return response.authentication
    }

    if (!authCheck.ok) {
        return "error"
    }
}

export const postUser = async (gateway: Gateway, name: string, email: string, password: string) => {

    const postUserForm = await fetch(`${gateway.authentication}user/create/`, {
        method: "POST",
        body: JSON.stringify({
            Name: name,
            Email: email,
            Password: password,
        }),
        headers: {
            "Content-Type":"application/json",
        },
    });
    const response = await postUserForm.json();

    if (postUserForm.ok) {
        return response;
    }

    return null;
}