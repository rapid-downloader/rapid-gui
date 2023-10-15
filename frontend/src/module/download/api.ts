import { Http } from "@/composable"
import { Download } from "../home/types"
import { Fetch } from "./types"

export default function () {

    const http = Http()

    async function all(): Promise<Record<string, Download>> {
        try {
            const res = await http.get<Download[]>('/entries')
            const data: Record<string, Download> = {}

            for (const entry of res.data) {
                data[entry.id] = entry
            }

            return data
        } catch (error) {
            return {}
        }
    }

    async function fetch(req: Fetch) {
        const res = await http.post('/fetch', req)
    }

    return { all }
}