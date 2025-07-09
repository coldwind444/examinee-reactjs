import type { Choice } from "./Choice"

export interface Question {
    id: number
    order: number
    content: string
    key: string
    choices: Choice[]
}