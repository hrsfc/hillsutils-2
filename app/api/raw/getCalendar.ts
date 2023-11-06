import { AxiosRequestConfig, NtlmClient, NtlmCredentials } from 'axios-ntlm';
import { CookieJar } from "tough-cookie";
import {HttpsCookieAgent} from "http-cookie-agent/http"
import { config } from "../api-config";
import { NextResponse } from 'next/server';

declare module "axios-ntlm" {
    interface AxiosRequestConfig {
        jar?: CookieJar;
    }
}

async function loadPage(
    credentials: NtlmCredentials,
    url = "",
    cookieJar = new CookieJar(),
    client: any = false
): Promise<Response> {
    if (client == false) {
        let clientConfig: AxiosRequestConfig = {
            baseURL: config.baseroute,
            method: 'get',
            httpsAgent:new HttpsCookieAgent({cookies:{jar:cookieJar}}),
            withCredentials: true,
        }
        client = NtlmClient(credentials, clientConfig)
    }

    console.log("Fetching ", url)
    let response: Response

    try {
        response = await client.get(url, {
            jar: cookieJar,
            withCredentials: true,
            headers: {
                'Authorization': 'NTLM TlRMTVNTUAABAAAAMYCI4gAAAAAoAAAAAAAAACgAAAAGAbEdAAAADw=='
            }
        })


        response = await client.get(url)

        return response
    } catch (err: any) {

        if (err.response && err.response.status == 401) {
            response = err.response.data
            console.warn("Credentials were invalid.")
        } else {
            console.warn(err)
        }
        return err.response
    }

    

}

export { loadPage }