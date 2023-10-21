import { useProgressbar } from "@/module/download/store"
import { App } from "vue"

export interface WebSocketOption {
    baseURL: string,
}

export interface Progress {
    id: string
    index: number
    downloaded: number
    size: number
    progress: number
    done: boolean
}

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $ws: WebSocket,
        $connectWs: Function,
        $closeWs: Function,
        $progress: Progress,
        $test: number
    }
}

function deserialize<T>(data: string, def?: T): T | undefined {
    const val = JSON.parse(data)
    if (val) return val as T

    return def
}

export default {
    install(app: App, option: WebSocketOption) {
        let ws: WebSocket

        app.config.globalProperties.$connectWs = () => {
            ws = new WebSocket(option.baseURL)
    
            ws.onopen = () => {
                console.log('web socket connected');
            }
    
            let id = 0
            function keepAlive(timeout: number) {
                if (ws.readyState === ws.OPEN) {
                    ws.send('ping')
                }

                // TODO: properly close the ws
                ws.onclose = () => {
                    console.log('closing web socket');
                    ws.close()
                }
    
                id = setTimeout(keepAlive, timeout)
            }
    
            keepAlive(1000 * 1000)

            const progressbar = useProgressbar()
            
            ws.onmessage = event => {
                const data = deserialize<Progress>(event.data)
                if (data) {
                    progressbar.updateProgress(data)
                }
            }
    
            app.provide('ws', ws)
            app.config.globalProperties.$ws = ws
        }

        app.config.globalProperties.$closeWs = () => {
            if (ws && ws.readyState === ws.OPEN) ws.close()
        }
    }
}