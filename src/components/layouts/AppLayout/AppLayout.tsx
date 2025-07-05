import clsx from "clsx"
import logo from '../../../assets/checked.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCube, faHistory, faHome, faPenClip, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import { Outlet } from "react-router-dom"

export const AppLayout = () => {
    const [tab, setTab] = useState(1)

    return (
        <div className={clsx('flex flex-row h-screen w-screen bg-(--white-bg)')}>
            <div className={
                clsx('flex flex-col gap-[40px] border-1 border-[rgba(0,0,0,0.2)]',
                    'h-full w-[250px] pl-[20px]'
                )}>
                <div className={clsx('flex flex-row gap-[10px] mt-[20px] items-center')}>
                    <img src={logo} className="h-[30px] w-[30px]" />
                    <label className='font-(family-name:--itim-font) text-[18px]'>
                        EXAM<span className="text-(--md-green)">INEE</span>
                    </label>
                </div>
                <label className='text-[rgba(0,0,0,0.6)]'>Main menu</label>
                <div className={clsx('flex flex-col gap-[10px]')}>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': tab === 1 }
                        )} onClick={() => { setTab(1) }}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': tab === 1 })} icon={faHome} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': tab === 1 })}>Home</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': tab === 2 }
                        )} onClick={() => { setTab(2) }}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': tab === 2 })} icon={faCube} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': tab === 2 })}>Library</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': tab === 3 }
                        )} onClick={() => { setTab(3) }}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': tab === 3 })} icon={faPenClip} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': tab === 3 })}>My exams</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': tab === 4 }
                        )} onClick={() => { setTab(4) }}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': tab === 4 })} icon={faHistory} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': tab === 4 })}>History</label>
                    </div>
                </div>
            </div>
            <div className={clsx('flex flex-1 flex-col')}>
                <div className="flex h-[80px] w-full border-l-0 border-1 border-[rgba(0,0,0,0.2)]">
                    <div className={clsx('flex flex-row gap-[15px] h-full ml-auto items-center')}>
                        <div className={
                            clsx('flex items-center justify-center h-[45px] w-[45px]',
                                'bg-[#E3E3E3] rounded-[20px] relative'
                            )}>
                            <div className={
                                clsx('h-[12px] w-[12px] bg-rose-300 rounded-full absolute',
                                    'translate-x-[15px] -translate-y-[17px] animate-ping'
                                )} />
                            <div className={
                                clsx('h-[10px] w-[10px] bg-rose-500 rounded-full absolute',
                                    'translate-x-[15px] -translate-y-[17px]'
                                )} />
                            <FontAwesomeIcon className="text-[18px]" icon={faBell} />
                        </div>
                        <div className={
                            clsx('flex items-center justify-center font-semibold ',
                                'bg-(--pale-orange) h-[55px] w-[55px] rounded-full text-[20px]'
                            )}>
                            T
                        </div>
                        <label className="font-medium">Tan Nguyen</label>
                        <div className={clsx('cursor-pointer mr-[50px] text-(--md-red)')}>
                            <FontAwesomeIcon icon={faSignOut} />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}