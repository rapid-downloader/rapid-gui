export type Type = 'Document' | 'Audio' | 'Video' | 'Image' | 'Compressed' | 'Other'

export type Status = 'Completed' | 'Downloading' | 'Queued' | 'Failed' | 'Paused'

export interface Download {
    id: string
    type: Type
    name: string
    size: number
    progress: number
    timeLeft: string
    speed: number
    status: Status
    date: Date
}