export interface Cookie {
    name: string
    value: string
    path: string
    domain: string
    expirationDate: Date
    secure: boolean
    httpOnly: boolean
    sameSite: string
}

export interface Fetch {
    url: string
    client: string
    provider: string
    contentType: string
    userAgent: string
    cookies: Cookie[]
}