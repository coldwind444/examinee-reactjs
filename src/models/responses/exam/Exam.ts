import type { Subject } from "./Subject"

export interface Exam {
    id: number
    title: string
    scale: number
    noq: number
    duration: number
    subject: Subject
}