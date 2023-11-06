import { type NextRequest } from "next/server"
import { loadPage } from "./getCalendar"
import { config } from "../api-config"

interface usernameAndPassword {
    username: string,
    password: string
}

export async function GET(req: NextRequest) {
    let params: object = Object.fromEntries(req.nextUrl.searchParams);
    console.log(params)

    let page: Response = await loadPage({
        username: "nuh uh",
        password: "nuh uh",
        domain:"hrsfc.ac.uk"
    })

    console.log(page)

    //@ts-ignore This ignores the page.data error (page should always have a data property)
    return new Response(page.data,{headers:{
        "Content-Type":"text/html"
    }})
}