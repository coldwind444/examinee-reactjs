import { faAngleRight, faFileText, faPenToSquare, faPercentage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { ExamCard } from "../../components/ExamCard/ExamCard"

export const HomePage = () => {
    return (
        <div className={clsx('flex flex-col gap-[20px]')}>
            <div className={clsx('flex flex-col gap-[5px] mt-[20px] ml-[40px]')}>
                <label className={clsx('text-[25px] font-semibold')}>Welcome Home, Tan Nguyen !</label>
                <label className={clsx('font-medium text-[rgba(0,0,0,0.5)]')}>Let's see how it's going </label>
            </div>
            <div className={clsx('flex flex-row gap-[20px] ml-[40px]')}>
                <div className={clsx('flex flex-col pl-[30px] gap-[10px] h-[150px] w-[300px] rounded-[20px] bg-(--pale-blue) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Exams done</label>
                    <FontAwesomeIcon className="absolute text-[25px] mr-[20px] mt-[10px] right-0 text-(--royal-blue)" icon={faFileText} />
                    <label className="text-[40px] font-semibold">300</label>
                    <Link className="text-(--royal-blue) hover:underline cursor-pointer font-semibold" to=''>
                        Details <span><FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link>
                </div>
                <div className={clsx('flex flex-col pl-[30px] gap-[10px] h-[150px] w-[300px] rounded-[20px] bg-(--pale-orange) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Attempts</label>
                    <FontAwesomeIcon className="absolute text-[25px] mr-[20px] mt-[10px] right-0 text-(--md-orange)" icon={faPenToSquare} />
                    <label className="text-[40px] font-semibold">589</label>
                    <Link className="text-(--md-orange) hover:underline cursor-pointer font-semibold" to=''>
                        Details <span><FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link>
                </div>
                <div className={clsx('flex flex-col pl-[30px] gap-[10px] h-[150px] w-[300px] rounded-[20px] bg-(--pale-green) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Average percentage</label>
                    <FontAwesomeIcon className="absolute text-[25px] mr-[20px] mt-[10px] right-0 text-(--md-green)" icon={faPercentage} />
                    <label className="text-[40px] font-semibold">85%</label>
                </div>
            </div>
            <div className={clsx('flex flex-col gap-[40px] mt-[20px] pl-[40px]')}>
                <div className="flex flex-row gap-[10px] items-center">
                    <label className={clsx('font-semibold')}>Recently done</label>
                    <div className="h-[1px] w-4/5 bg-[rgba(0,0,0,0.2)]"/>
                </div>
                <div className={clsx('flex flex-row gap-[20px]')}>
                    <ExamCard/>
                    <ExamCard/>
                    <ExamCard/>
                    <ExamCard/>
                </div>
            </div>
        </div>
    )
}