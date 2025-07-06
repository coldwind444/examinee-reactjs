import { faAngleLeft, faAngleRight, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useState } from "react"
import { ExamCard } from "../../components/ExamCard/ExamCard"

export const LibraryPage = () => {
    const subjects = ['All', 'Math', 'Literature', 'Biology', 'Physics']
    const [currSub, setCurrSub] = useState(0)

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-col gap-[5px] mt-[20px]')}>
                <label className={clsx('text-[25px] font-semibold')}>Explore new tests from Library !</label>
                <label className={clsx('font-medium text-[rgba(0,0,0,0.5)]')}>Let's review your lesson !</label>
            </div>
            <div className={clsx('flex flex-row gap-[10px] items-center')}>
                <div className={
                    clsx('flex justify-center items-center relative',
                        'h-[40px] w-[400px] rounded-[25px] border-2 border-[rgba(0,0,0,0.2)]',
                        'focus-within:border-(--dodger-blue) transition-colors duration-150 ease-in'
                    )}>
                    <input className={clsx('border-none outline-none h-[40px] w-full pl-[15px] pr-[10px]')}
                        type="search" placeholder="Search..." />
                    <FontAwesomeIcon icon={faSearch} className='text-[rgba(0,0,0,0.4)] right-0 mr-[20px] absolute' />
                </div>
                <div className={clsx('flex flex-row gap-[10px] items-center')}>
                    <div className={
                        clsx('flex items-center justify-center aspect-square',
                            'h-[28px] text-[12px] text-white rounded-full bg-(--dark-mint)',
                            'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                        )}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className={clsx('flex-1 flex flex-row gap-[5px]')}>
                        {subjects.map((value, index) =>
                        (<div key={index} className={
                            clsx('h-[38px] min-w-[100px] w-fit border-2 rounded-[19px] flex items-center justify-center',
                                'pl-[15px] pr-[15px] cursor-pointer transition-colors duration-150 ease-linear font-medium',
                                {
                                    'border-[rgba(0,0,0,0.2)]': index !== currSub,
                                    'border-(--dark-mint) bg-(--dark-mint) text-white': index === currSub
                                }
                            )} onClick={() => setCurrSub(index)}>{value}
                        </div>))}
                    </div>
                    <div className={
                        clsx('flex items-center justify-center aspect-square',
                            'h-[28px] text-[12px] text-white rounded-full bg-(--dark-mint)',
                            'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                        )}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            </div>
            <div className={clsx('flex flex-row gap-[20px] flex-wrap h-[500px] w-full overflow-y-scroll')}>
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
            </div>
        </div>
    )
}