import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

export const AttemptPage = () => {
    const as = [
        {
            id: 1,
            date: '20-11-2025',
            time: '09:00',
            result: '101/120',
            duration: '70:02',
        },
        {
            id: 2,
            date: '20-11-2025',
            time: '09:00',
            result: '101/120',
            duration: '70:02',
        },
        {
            id: 3,
            date: '20-11-2025',
            time: '09:00',
            result: '101/120',
            duration: '70:02',
        },
        {
            id: 4,
            date: '20-11-2025',
            time: '09:00',
            result: '101/120',
            duration: '70:02',
        },
        {
            id: 5,
            date: '20-11-2025',
            time: '09:00',
            result: '101/120',
            duration: '70:02',
        },
    ]

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[25px] font-semibold')}>Đề thi Toán THPTQG</label>
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
                        {as.map((value) => (
                            <tr key={value.id} className={clsx('h-[80px] border-b-1 border-[rgba(0,0,0,0.15)] font-medium')}>
                                <td className="text-center">{value.id}</td>
                                <td className="text-center">{value.date}</td>
                                <td className="text-center">{value.time}</td>
                                <td>
                                    <div className="flex flex-row gap-[15px] ml-auto mr-auto items-center justify-center">
                                        <label>{value.result}</label>
                                        <div className="h-[5px] w-[50px] bg-gray-300 rounded-[3px] overflow-hidden">
                                            <div className="h-full w-4/5 bg-(--md-green)"></div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-center">{value.duration}</td>
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
                    )}>
                        Previous
                    </div>
                    <div className={
                        clsx('flex items-center justify-center h-[40px] w-[100px] rounded-[8px]',
                            'bg-(--royal-blue) text-white font-semibold cursor-pointer',
                            'hover:opacity-90 transition-opacity duration-150 ease-in'
                    )}>
                        Next
                    </div>
                </div>
            </div>
        </div>
    )
}