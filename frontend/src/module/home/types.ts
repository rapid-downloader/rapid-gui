export type Type = 'Document' | 'Audio' | 'Video' | 'Image' | 'Compressed' | 'Other'

export type Status = 'Completed' | 'Stoped' | 'Downloading' | 'Queued' | 'Failed' | 'Paused'

export type Sort = 'date' | 'name' | 'size'

export interface Download {
    id: string
    name: string
    url: string
    provider: string
    size: number
    type: Type
    chunklen: number
    resumable: boolean
    progress: number
    expired: boolean
    chunkProgress: number[]
    timeLeft: Date
    speed: number
    status: Status
    date: Date
}