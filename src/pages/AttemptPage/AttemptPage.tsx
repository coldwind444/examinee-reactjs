import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useApp } from "../../providers/AppContext"
import { useEffect, useState } from "react"
import { useAuth } from "../../providers/AuthContext"
import { getAttempts } from "../../apis/attempt"
import type { Attempt } from "../../models/responses/attempt/Attempt"

export const AttemptPage = () => {
    const { jwt } = useAuth()
    const { detailEid } = useApp()

    const [attempts, setAttempts] = useState<Attempt[]>([])
    const [attSection, setAttSection] = useState(0)

    const handleSectionSwitch = (next: boolean) => {
        if (next) {
            const n = attempts.length
            const maxSection = n / 5 + (n % 5 === 0 ? 0 : 1)
            if (attSection < maxSection) setAttSection(prev => prev + 1)
        } else {
            if (attSection > 0) setAttSection(prev => prev - 1)
        }
    }

    const splitDateTime = (input: string | Date) : { date: string; time: string } | null => {
        if (!input) return null

        const date = typeof input === 'string' ? new Date(input) : input

        const dd = date.getDate().toString().padStart(2, '0')
        const MM = (date.getMonth() + 1).toString().padStart(2, '0') 
        const yyyy = date.getFullYear()

        const mm = date.getMinutes().toString().padStart(2, '0')
        const ss = date.getSeconds().toString().padStart(2, '0')

        return {
            date: `${dd}-${MM}-${yyyy}`,
            time: `${mm}:${ss}`
        }
    }

    const formatTime = (totalSeconds: number) : string | null => {
        if (!totalSeconds) return null
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (!detailEid || !jwt) return
        const fetchAttempts = async () => {
            try {
                const res = await getAttempts(jwt, detailEid.id)
                if (res.status === 200) {
                    setAttempts(res.data)
                }
            } catch (e) {
                console.error('Fetch attempts failed.', e)
            }
        }
        fetchAttempts()
    }, [detailEid, jwt])

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[22px] font-semibold')}>{detailEid?.title}</label>
            </div>
            <div className="w-[1100px]">
                <table className="table-auto mt-[20px] w-full">
                    <thead>
                        <tr className="text-[rgba(0,0,0,0.4)] border-b-4 border-b-(--md-mint) h-[50px]">
                            <th className="font-medium">Id</th>
                            <th className="font-medium">Date</th>
                            <th className="font-medium">Time</th>
                            <th className="font-medium">Result</th>
                            <th className="font-medium">Duration</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody className="max-h-[500px] overflow-y-scroll">
                        {attempts.filter((_,idx) => idx >= 5*attSection && idx < 5*attSection + 5).map((value) => (
                            <tr key={value.id} className={clsx('h-[80px] border-b-1 border-[rgba(0,0,0,0.15)] font-medium')}>
                                <td className="text-center">{value.id}</td>
                                <td className="text-center">{splitDateTime(value?.dateTime)?.date}</td>
                                <td className="text-center">{splitDateTime(value?.dateTime)?.time}</td>
                                <td>
                                    <div className="flex flex-row gap-[15px] ml-auto mr-auto items-center justify-center">
                                        <label>{`${value.correct}/${detailEid?.noq}`}</label>
                                        <div className="h-[5px] w-[50px] bg-gray-300 rounded-[3px] overflow-hidden">
                                            <div className="h-full w-4/5 bg-(--md-green)"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{formatTime(value.duration)}</td>
                                <td>
                                    <div className={
                                        clsx('flex items-center justify-center h-[40px] w-[150px] rounded-[10px]',
                                            'text-(--deep-pink) ml-auto mr-auto hover:opacity-90',
                                            'cursor-pointer bg-(--deep-pink) text-white',
                                            'transition-opacity duration-100 ease-in'
                                        )}>
                                        View details
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='flex flex-row items-center justify-between mt-[10px] w-[1100px]'>
                <label className='text-[rgba(0,0,0,0.5)] font-medium text-[14px]'>Showing 1 to 5 of 20 results</label>
                <div className='flex flex-row gap-[10px]'>
                    <div className={
                        clsx('flex items-center justify-center h-[40px] w-[100px] rounded-[8px]',
                            'border-1 border-[rgba(0,0,0,0.2)] font-semibold cursor-pointer',
                            'hover:opacity-90 transition-opacity duration-150 ease-in'
                        )} onClick={() => handleSectionSwitch(false)}>
                        Previous
                    </div>
                    <div className={
                        clsx('flex items-center justify-center h-[40px] w-[100px] rounded-[8px]',
                            'bg-(--royal-blue) text-white font-semibold cursor-pointer',
                            'hover:opacity-90 transition-opacity duration-150 ease-in'
                        )} onClick={() => handleSectionSwitch(true)}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}