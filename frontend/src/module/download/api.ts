import { Http } from "@/composable"
import { Download } from "../home/types"
import { Fetch } from "./types"
import { isAxiosError } from "axios"

export default function Download() {

    const http = Http()

    async function all(): Promise<Record<string, Download>> {
        try {
            const res = await http.get<Download[]>('/entries')
            if (res.status !== 200) {
                return {}
            }
            
            const data: Record<string, Download> = {}

            for (const entry of res.data) {
                data[entry.id] = entry
            }

            return data
        } catch (error) {
            return {}
        }
    }

    async function fetch(req: Fetch): Promise<Download | undefined> {
        try {
            const res = await http.post<Download>('/fetch', req)
            if (res.status === 200) {
                return res.data
            }
            
        } catch (error) {
            if (isAxiosError(error)) {
                // TODO: add notification
                console.log(error.response?.data.message);
            }
        }
    }

    async function download(id: string): Promise<boolean> {
        try {
            const res = await http.get(`/gui/download/${id}`)
            return res.status === 200
            
        } catch (error) {
            if (isAxiosError(error)) {
                // TODO: add notification
                console.log(error.response?.data.message);
            }

            return false
        }
    }

    return { all, fetch, download }
}