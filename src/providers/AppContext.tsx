import { createContext, useState, useContext, type PropsWithChildren, type SetStateAction } from "react"
import type { Exam } from "../models/responses/exam/Exam"

export type AppContextType = {
    doingEid: Exam | undefined
    setDoingEid: React.Dispatch<SetStateAction<Exam|undefined>>
    detailEid: Exam | undefined
    setDetailEid: React.Dispatch<SetStateAction<Exam|undefined>>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {
    const [doingEid, setDoingEid] = useState<Exam|undefined>()
    const [detailEid, setDetailEid] = useState<Exam|undefined>()

    return (
        <AppContext.Provider value={
            {
                doingEid, setDoingEid,
                detailEid, setDetailEid
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