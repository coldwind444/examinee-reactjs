import { createContext, useState, useContext, type PropsWithChildren, type SetStateAction } from "react"
import type { Exam } from "../models/responses/exam/Exam"
import type { Attempt } from "../models/responses/attempt/Attempt"
import type { Question } from "../models/responses/question/Question"

export type AppContextType = {
    doingEid: Exam | undefined
    setDoingEid: React.Dispatch<SetStateAction<Exam|undefined>>
    detailEid: Exam | undefined
    setDetailEid: React.Dispatch<SetStateAction<Exam|undefined>>
    attempt: Attempt | undefined
    setAttempt: React.Dispatch<SetStateAction<Attempt|undefined>>
    rvPopup: boolean
    setRvPopup: React.Dispatch<SetStateAction<boolean>>
    rvObj: ReviewObjectType|undefined
    setRvObj: React.Dispatch<SetStateAction<ReviewObjectType|undefined>>
}

export type ReviewObjectType = {
    question: Question
    answer: string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
    const [doingEid, setDoingEid] = useState<Exam|undefined>()
    const [detailEid, setDetailEid] = useState<Exam|undefined>()
    const [attempt, setAttempt] = useState<Attempt|undefined>()
    
    const [rvPopup, setRvPopup] = useState(false)
    const [rvObj, setRvObj] = useState<ReviewObjectType>()

    return (
        <AppContext.Provider value={
            {
                doingEid, setDoingEid,
                detailEid, setDetailEid,
                attempt, setAttempt,
                rvPopup, setRvPopup,
                rvObj, setRvObj
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useApp = () => {
    const ctx = useContext(AppContext)
    if (!ctx) throw new Error("useApp must be used inside an <AppProvider>")
    return ctx
}