import { createContext, useState, useContext, type PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./AuthContext"
import { useLocation } from "react-router-dom"

export type AppContextType = {
    
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: PropsWithChildren<{}>) => {

    return (
        <AppContext.Provider value={
            {

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