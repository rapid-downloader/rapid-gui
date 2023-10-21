import { Progress } from "@/plugins/ws";
import { getCurrentInstance } from "vue";

interface Websocket {
    connect: () => void
    close: () => void
    conn?: WebSocket
}

export default function(): Websocket {
    const instance = getCurrentInstance()
    if(!instance || !instance.proxy) {
        throw new Error(`Websocket can only be called inside setup()`)
    }

    return {
        connect() {
            instance.proxy?.$connectWs()
        },
        close() {
            instance.proxy?.$closeWs()
        },
        conn: instance.proxy.$ws,
    }
}