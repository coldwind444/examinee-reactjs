import { faAngleRight, faFileText, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { Link } from "react-router-dom"
import { ExamCard } from "../../components/ExamCard/ExamCard"
import { useUser } from "../../providers/UserContext"
import { useAuth } from "../../providers/AuthContext"
import { useEffect, useState } from "react"
import type { Exam } from "../../models/responses/exam/Exam"
import { countDoneExams, countAttempts, getRecent } from "../../apis/attempt"

export const HomePage = () => {
    const { user } = useUser()
    const { jwt } = useAuth()

    const [doneExams, setDoneExams] = useState(0)
    const [totalAttempts, setTotalAttempts] = useState(0)

    const [recent, setRecent] = useState<Exam[]>([])

    useEffect(() => {
        if (!jwt) return
        const fetchDoneExams = async () => {
            try {
                const res = await countDoneExams(jwt)
                if (res.status === 200) setDoneExams(res.data)
            } catch (e) {
                console.error('Count done exams failed.', e)
            }
        }

        const fetchTotalAtt = async () => {
            try {
                const res = await countAttempts(jwt)
                if (res.status === 200) setTotalAttempts(res.data)
            } catch (e) {
                console.error('Count total attempts failed.', e)
            }
        }

        const fetchRecent = async () => {
            try {
                const res = await getRecent(jwt)
                if (res.status === 200) setRecent(res.data)
            } catch (e) {
                console.error('Fetch recent failed.', e)
            }
        }

        fetchDoneExams()
        fetchTotalAtt()
        fetchRecent()
    }, [jwt])

    return (
        <div className={clsx('flex flex-col gap-[20px]')}>
            <div className={clsx('flex flex-col gap-[5px] mt-[20px] ml-[40px]')}>
                <label className={clsx('text-[25px] font-semibold')}>{`Welcome Home, ${user?.fname} ${user?.lname} !`}</label>
                <label className={clsx('font-medium text-[rgba(0,0,0,0.5)]')}>Let's see how it's going </label>
            </div>
            <div className={clsx('flex flex-row gap-[20px] ml-[40px]')}>
                <div className={clsx('flex flex-col pl-[30px] gap-[10px] h-[150px] w-[300px] rounded-[20px] bg-(--pale-blue) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Exams done</label>
                    <FontAwesomeIcon className="absolute text-[25px] mr-[20px] mt-[10px] right-0 text-(--royal-blue)" icon={faFileText} />
                    <label className="text-[40px] font-semibold">{doneExams}</label>
                    <Link className="text-(--royal-blue) hover:underline cursor-pointer font-semibold" to=''>
                        Details <span><FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link>
                </div>
                <div className={clsx('flex flex-col pl-[30px] gap-[10px] h-[150px] w-[300px] rounded-[20px] bg-(--pale-orange) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Attempts</label>
                    <FontAwesomeIcon className="absolute text-[25px] mr-[20px] mt-[10px] right-0 text-(--md-orange)" icon={faPenToSquare} />
                    <label className="text-[40px] font-semibold">{totalAttempts}</label>
                    <Link className="text-(--md-orange) hover:underline cursor-pointer font-semibold" to=''>
                        Details <span><FontAwesomeIcon icon={faAngleRight} /></span>
                    </Link>
                </div>
            </div>
            <div className={clsx('flex flex-col gap-[40px] mt-[20px] pl-[40px]')}>
                <div className="flex flex-row gap-[10px] items-center">
                    <label className={clsx('font-semibold')}>Recently done</label>
                    <div className="h-[1px] w-4/5 bg-[rgba(0,0,0,0.2)]" />
                </div>
                <div className={clsx('flex flex-row gap-[20px]')}>
                    {recent.map((exam) => (
                        <ExamCard key={exam.id} exam={exam} isAttempt={true} />
                    ))}
                </div>
            </div>
        </div>
    )
}