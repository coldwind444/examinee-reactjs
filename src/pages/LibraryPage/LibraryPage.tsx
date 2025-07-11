import { faAngleLeft, faAngleRight, faPlusCircle, faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { ExamCard } from "../../components/ExamCard/ExamCard"
import { useAuth } from "../../providers/AuthContext"
import { getAllSubs, getExamsByFilters, getMyExamsByFilters } from "../../apis/exam"
import type { Exam } from "../../models/responses/exam/Exam"
import { getHistoryByFilters } from "../../apis/attempt"
import type { Subject } from "../../models/responses/exam/Subject"
import { useNavigate } from "react-router-dom"

export type LibraryPageProps = {
    type: number
}

export const LibraryPage = ({ type }: LibraryPageProps) => {
    const { jwt } = useAuth()
    const navigate = useNavigate()

    const [keyword, setKeyword] = useState<string | undefined>(undefined)
    const [currSub, setCurrSub] = useState<number | undefined>(undefined)
    const [exams, setExams] = useState<Exam[]>([])
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [subSection, setSubSection] = useState(0)


    const handleSectionSwitch = (next: boolean) => {
        if (next) {
            const n = subjects.length
            const maxSection = n / 4 + (n % 4 === 0 ? 0 : 1)
            if (subSection < maxSection) setSubSection(prev => prev + 1)
        } else {
            if (subSection > 0) setSubSection(prev => prev - 1)
        }
    }

    const getTitles = () => {
        if (type === 1) {
            return {
                title: 'Explore new tests from Library !',
                sub: 'Let\'s review your lesson !'
            }
        } else if (type === 2) {
            return {
                title: 'View the tests you created in My exams !',
                sub: 'What have you shared to others ?'
            }
        } else if (type === 3) {
            return {
                title: 'View your attempts in History',
                sub: 'Let\'s see how hard-working you are !'
            }
        }
    }

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const res = await getAllSubs(jwt)
                if (res.status === 200) setSubjects(res.data)
            } catch (e) {
                console.error('Fetch subjects failed.', e)
            }
        }

        fetchSubjects()
    }, [jwt])

    useEffect(() => {
        if (!jwt) return

        const fetchAll = async () => {
            try {
                const res = await getExamsByFilters(jwt, currSub, keyword)
                if (res.status === 200) setExams(res.data)
            } catch (e) {
                console.error('Fetch all failed.', e)
            }
        }

        const fetchMine = async () => {
            try {
                const res = await getMyExamsByFilters(jwt, currSub, keyword)
                if (res.status === 200) setExams(res.data)
            } catch (e) {
                console.error('Fetch all failed.', e)
            }
        }

        const fetchHistory = async () => {
            try {
                const res = await getHistoryByFilters(jwt, currSub, keyword)
                if (res.status === 200) setExams(res.data)
            } catch (e) {
                console.error('Fetch all failed.', e)
            }
        }

        if (type === 1) fetchAll()
        else if (type === 2) fetchMine()
        else if (type === 3) fetchHistory()
    }, [jwt, currSub, keyword])

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-col gap-[5px] mt-[20px]')}>
                <label className={clsx('text-[25px] font-semibold')}>{getTitles()?.title}</label>
                <label className={clsx('font-medium text-[rgba(0,0,0,0.5)]')}>{getTitles()?.sub}</label>
            </div>
            {type === 2 && 
            (
                <div className={
                    clsx("flex flex-row gap-[10px] items-center justify-center cursor-pointer",
                        'font-medium text-[18px] absolute right-0 mr-[200px] mt-[50px]',
                        'hover:gap-[20px] transition-[gap] duration-100 ease-in'
                    )} onClick={() => navigate('/app/my-exams/publish')}>
                    <label>New exam</label>
                    <FontAwesomeIcon className="text-(--royal-blue)" icon={faPlusCircle}/>
                </div>
            )
            }
            <div className={clsx('flex flex-row gap-[10px] items-center')}>
                <div className={
                    clsx('flex justify-center items-center relative',
                        'h-[40px] w-[400px] rounded-[25px] border-2 border-[rgba(0,0,0,0.2)]',
                        'focus-within:border-(--dodger-blue) transition-colors duration-150 ease-in'
                    )}>
                    <input className={clsx('border-none outline-none h-[40px] w-full pl-[15px] pr-[10px]')}
                        type="search" placeholder="Search..." onChange={(e) => setKeyword(e.target.value)} />
                    <FontAwesomeIcon icon={faSearch} className='text-[rgba(0,0,0,0.4)] right-0 mr-[20px] absolute' />
                </div>
                <div className={clsx('flex flex-row gap-[10px] items-center')}>
                    <div className={
                        clsx('flex items-center justify-center aspect-square',
                            'h-[28px] text-[12px] text-white rounded-full bg-(--dark-mint)',
                            'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                        )} onClick={() => handleSectionSwitch(false)}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className={clsx('flex-1 flex flex-row gap-[5px]')}>
                        <div className={
                            clsx('h-[38px] min-w-[100px] w-fit border-2 rounded-[19px] flex items-center justify-center',
                                'pl-[15px] pr-[15px] cursor-pointer transition-colors duration-150 ease-linear font-medium',
                                {
                                    'border-[rgba(0,0,0,0.2)]': currSub,
                                    'border-(--dark-mint) bg-(--dark-mint) text-white': !currSub
                                }
                            )} onClick={() => setCurrSub(undefined)}>All
                        </div>
                        {subjects.filter((_, idx) => idx >= 4 * subSection && idx < 4 * subSection + 4).map((value, index) =>
                        (<div key={index} className={
                            clsx('h-[38px] min-w-[100px] w-fit border-2 rounded-[19px] flex items-center justify-center',
                                'pl-[15px] pr-[15px] cursor-pointer transition-colors duration-150 ease-linear font-medium',
                                {
                                    'border-[rgba(0,0,0,0.2)]': index !== currSub,
                                    'border-(--dark-mint) bg-(--dark-mint) text-white': index === currSub
                                }
                            )} onClick={() => setCurrSub(value.id)}>{value.name}
                        </div>))}
                    </div>
                    <div className={
                        clsx('flex items-center justify-center aspect-square',
                            'h-[28px] text-[12px] text-white rounded-full bg-(--dark-mint)',
                            'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                        )} onClick={() => handleSectionSwitch(true)}>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                </div>
            </div>
            <div className={clsx('flex flex-row gap-[20px] flex-wrap h-[500px] w-full overflow-y-scroll')}>
                {exams.map((exam) => (
                    <ExamCard key={exam.id} exam={exam} isAttempt={type === 3} />
                ))}
            </div>
        </div>
    )
}