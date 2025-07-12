import { faBookmark, faHourglass, faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import type { Exam } from "../../models/responses/exam/Exam"
import { useApp } from "../../providers/AppContext"
import { useNavigate } from "react-router-dom"

export type ExamCardProps = {
    exam: Exam
    isAttempt?: boolean
}

export const ExamCard = ({ exam, isAttempt = false }: ExamCardProps) => {
    const { setDoingEid, setDetailEid } = useApp()
    const navigate = useNavigate()

    const handleAttempt = () => {
        if (!confirm('Are you sure to start this exam ?')) return
        setDoingEid(exam)
        navigate('/exam/attend')
    }

    const handleViewDetails = () => {
        setDetailEid(exam)
        navigate('/app/history/attempts')
    }

    return (
        <div className={clsx('flex flex-col h-[290px] w-[250px] p-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[15px]')}>
            <div className={clsx('flex flex-row gap-[15px]')}>
                <FontAwesomeIcon className={clsx("text-(--md-green) text-[25px]", {'opacity-0': !isAttempt})} icon={faCheckCircle} />
                <label className="text-[18px] font-semibold leading-[1.2] h-[50px]">{exam?.title}</label>
            </div>
            <div className='flex flex-col gap-[15px] ml-[30px] mt-[30px]'>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px]')} icon={faHourglass} />
                    <label>{`${exam?.duration} mins`}</label>
                </div>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px] -ml-[3px]')} icon={faQuestionCircle} />
                    <label>{`${exam?.noq} questions`}</label>
                </div>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px] mr-[3px]')} icon={faBookmark} />
                    <label>{exam?.subject.name}</label>
                </div>
            </div>
            {isAttempt ?
                (
                    <div className={
                        clsx('flex items-center justify-center h-[40px] w-[180px] mt-[30px] font-semibold',
                            'border-2 border-(--deep-pink) ml-auto mr-auto rounded-[10px] text-(--deep-pink)',
                            'cursor-pointer hover:bg-(--deep-pink) hover:text-white',
                            'transition-colors duration-150 ease-in'
                        )} onClick={() => handleViewDetails()}>
                        Details
                    </div>
                ) :
                (
                    <div className={
                        clsx('flex items-center justify-center h-[40px] w-[180px] mt-[30px] font-semibold',
                            'border-2 border-(--md-orange) ml-auto mr-auto rounded-[10px] text-(--md-orange)',
                            'cursor-pointer hover:bg-(--md-orange) hover:text-white',
                            'transition-colors duration-150 ease-in'
                        )} onClick={() => handleAttempt()}>
                        Attempt
                    </div>
                )}
        </div>
    )
}