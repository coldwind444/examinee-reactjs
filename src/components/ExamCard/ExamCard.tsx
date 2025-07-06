import { faBookmark, faHourglass, faQuestionCircle } from "@fortawesome/free-regular-svg-icons"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

export const ExamCard = () => {
    return (
        <div className={clsx('flex flex-col h-[290px] w-[250px] p-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[15px]')}>
            <div className={clsx('flex flex-row gap-[15px]')}>
                <FontAwesomeIcon className="text-(--md-green) text-[25px]" icon={faCheckCircle}/>
                <label className="text-[18px] font-semibold leading-[1.2] h-[50px]">Economy TOEIC New Test 10</label>
            </div>
            <div className='flex flex-col gap-[15px] ml-[30px] mt-[30px]'>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px]')} icon={faHourglass}/>
                    <label>120 mins</label>
                </div>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px] -ml-[3px]')} icon={faQuestionCircle}/>
                    <label>90 questions</label>
                </div>
                <div className={clsx('flex flex-row gap-[15px] text-(--steel) font-semibold items-center')}>
                    <FontAwesomeIcon className={clsx('text-[20px] mr-[3px]')} icon={faBookmark}/>
                    <label>English</label>
                </div>
            </div>
            <div className={
                clsx('flex items-center justify-center h-[40px] w-[180px] mt-[30px] font-semibold',
                    'border-2 border-(--md-orange) ml-auto mr-auto rounded-[10px] text-(--md-orange)',
                    'cursor-pointer hover:bg-(--md-orange) hover:text-white',
                    'transition-colors duration-150 ease-in'
            )}>
                Attempt
            </div>
        </div>
    )
}