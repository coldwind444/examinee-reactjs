import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faClipboardCheck, faHourglassHalf, faPercentage, faFlag } from "@fortawesome/free-solid-svg-icons"
import { useApp, type ReviewObjectType } from "../../providers/AppContext"
import { useEffect, useState } from "react"
import type { Question } from "../../models/responses/question/Question"
import { getExamQuestions } from "../../apis/exam"
import { useAuth } from "../../providers/AuthContext"
import { useNavigate } from "react-router-dom"

export const ResultPage = () => {
    const { jwt } = useAuth()
    const { attempt, detailEid, setRvObj, setRvPopup } = useApp()
    const [questions, setQuestions] = useState<Question[]>([])
    const navigate = useNavigate()

    const getPercentage = (): number | null => {
        if (!attempt || !detailEid) return null
        const n = (attempt?.correct / detailEid?.noq) * 100
        return Math.floor(n)
    }

    const formatTime = (totalSeconds: number | undefined): string | null => {
        if (!totalSeconds) return null
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes} : ${seconds}`;
    }

    const calculateScore = () => {
        if (!attempt || !detailEid) return null
        const res = (detailEid.scale / detailEid.noq) * attempt.correct
        return Math.floor(res)
    }

    useEffect(() => {
        if (!jwt || !detailEid) return
        const fetchQuestion = async () => {
            try {
                const res = await getExamQuestions(jwt, detailEid?.id)
                if (res.status === 200) setQuestions(res.data)
            } catch (e) {
                console.error('Fetch questions failed.', e)
            }
        }
        fetchQuestion()
    }, [jwt, detailEid])

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px] relative')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')} 
            onClick={() => navigate('/app/history/attempts')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[22px] font-semibold')}>{detailEid?.title}</label>
            </div>
            <div className={clsx('flex flex-row gap-[20px]')}>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-[#D3E0FF] relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Result</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#2050C2]" icon={faClipboardCheck} />
                    <label className="text-[#2050C2] ml-auto mr-auto text-[30px] font-medium">{`${attempt?.correct}/${detailEid?.noq}`}</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-(--pale-mint) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Percentage</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#0C8478]" icon={faPercentage} />
                    <label className="text-[#0C8478] ml-auto mr-auto text-[30px] font-medium">{`${getPercentage()}%`}</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-(--pale-orange) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Duration</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#D86F0E]" icon={faHourglassHalf} />
                    <label className="text-[#D86F0E] ml-auto mr-auto text-[30px] font-medium">{formatTime(attempt?.duration)}</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-[#F7DBE4] relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Score</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#DE3067]" icon={faFlag} />
                    <label className="text-[#DE3067] ml-auto mr-auto text-[30px] font-medium">{calculateScore()}</label>
                </div>
            </div>
            <label className="mt-[20px] text-[rgba(0,0,0,0.5)] font-medium">Answers and keys</label>
            <div className="flex flex-row flex-wrap gap-[40px] max-h-[400px] w-9/10 overflow-y-scroll custom-scrollbar">
                {
                    questions.map((val) => {
                        const ans = attempt?.answers.charAt(val.order - 1)
                        const reviewObj: ReviewObjectType = {
                            question: val,
                            answer: ans ?? '_'
                        }
                        return (
                            <div key={val.order} className="flex flex-row gap-[15px] items-center">
                                <div className={
                                    clsx('aspect-square h-[40px] rounded-full flex items-center justify-center font-semibold',
                                        'hover:underline cursor-pointer',
                                        {
                                            'bg-[#94E8BB] text-[#09763C]': ans === val.key,
                                            'bg-[#FEA6A7] text-[#800507]': ans !== val.key
                                        }
                                    )} onClick={() => {
                                        setRvObj(reviewObj)
                                        setRvPopup(true)
                                    }}>
                                    {val.order}</div>
                                <label>Yours: <b>{ans}</b> - Key: <b>{val.key}</b></label>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}