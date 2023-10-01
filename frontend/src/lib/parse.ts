import { useDateFormat } from "@vueuse/core"

export function parseSize(size: number): string {
    const KB = 1024
    const MB = KB * KB
    const GB = MB * KB

    if (size < KB) return (size / KB).toFixed(2) + " KB"
    if (size > KB && size < MB) return (size / KB).toFixed(2) + " KB"
    if (size > KB && size < GB) return (size / MB).toFixed(2) + " MB"
    if (size > GB) return (size / GB).toFixed(2) + " GB"

    return '0 KB'
}

export function parseElapsedTime(start: Date): string {
    const begin = new Date(start)
    const end = new Date()

    const elapsed = new Date(end.getTime() - begin.getTime())
    let s = elapsed.getSeconds() % 60
    let m = elapsed.getMinutes() % 60
    let h = ((elapsed.getMinutes() / 60) % 24)

    return `${h < 10 ? '0' + h.toFixed(0) : h.toFixed(0)}h : ${m < 10 ? '0' + m : m}m : ${s < 10 ? '0' + s : s}s`
}

export function parseDate(date: Date | string): string {
    return useDateFormat(date, 'MMMM DD, YYYY HH:mm').value
}

function ext(name: string): string | null {
    const match = name.match(/\.([^.]+)$/);
    return match ? match[1] : null;
}

export function truncate(name: string, maxLength = 70): string {
    if (name.length <= maxLength) return name

    const extension = ext(name)
    const prefix = `...${extension ? ` .${extension}` : ''}`
    const truncatedlen = maxLength - prefix.length;
    return name.slice(0, truncatedlen) + prefix
}