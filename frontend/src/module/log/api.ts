import { Http } from "@/composable"

export default {

    async get(date: string): Promise<string[]> {
        try {
            const res = await Http().get(`/logs/${date}`)
            return res.data
        } catch (error) {
            return []
        }
    }
}