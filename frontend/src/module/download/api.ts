import { Http } from "@/composable"
import { Download } from "../home/types"

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

    return { all }
}