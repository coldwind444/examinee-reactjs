import { faAngleLeft, faAngleRight, faEraser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useApp } from "../../providers/AppContext"
import { useEffect, useState, useRef } from "react"
import { useAuth } from "../../providers/AuthContext"
import type { Question } from "../../models/responses/question/Question"
import { getExamQuestions } from "../../apis/exam"
import { submit } from "../../apis/attempt"
import { useNavigate } from "react-router-dom"

export const ExamPage = () => {
    const { jwt } = useAuth()
    const { doingEid } = useApp()
    const navigate = useNavigate()
    const timerRef = useRef<number | null>(null)

    const [questions, setQuestions] = useState<Question[]>([])
    const [indexes, setIndexes] = useState<number[]>([])
    const [currQ, setCurrQ] = useState(0)
    const [currAns, setCurrAns] = useState('_')
    const [answers, setAnswers] = useState<string[]>([])
    const [loading, setLoading] = useState(false)

    const [time, setTime] = useState(doingEid ? doingEid.duration * 60 : 0) // seconds
    const [isActive, setIsActive] = useState(true)

    const handleSaveQuestionAndNext = () => {
        setAnswers(prev => prev.map((val, idx) => idx === currQ ? currAns : val))
        if (currQ < indexes.length - 1) {
            setCurrQ(prev => prev + 1)
        }
    }

    const handlePreviousQuestion = () => {
        if (currQ > 0) setCurrQ(prev => prev - 1)
    }

    const handleSwitchQuestion = (order: number) => {
        setCurrQ(order)
        if (answers[order - 1] !== '_') setCurrAns(answers[order - 1])
        else setCurrAns('_')
    }

    const handleSubmit = async () => {
        if (!confirm('Are you sure to submit your answers ?')) return
        if (answers.includes('_') && !confirm('Some answers are missing. Still submit?')) return
        if (!doingEid || !jwt) return

        if (timerRef.current) clearInterval(timerRef.current)
        setIsActive(false)
        try {
            setAnswers(prev => prev.map((val, idx) => idx === currQ ? currAns : val))
            const res = await submit(jwt, doingEid?.id,
                {
                    dateTime: new Date(),
                    duration: doingEid.duration * 60 - time, // seconds
                    answers: answers
                })
            if (res.data) navigate('/app/home')
        } catch (e) {
            console.error('Submit failed.', e)
        }
    }

    const handleExit = () => {
        if (!confirm('Are you sure to stop doing exam ? All answers will not be saved after you exit.')) return
        setAnswers([])
        setCurrAns('_')
        setCurrQ(0)
        if (timerRef.current) clearInterval(timerRef.current)
        setIsActive(false)
        setTime(0)
        navigate('/app/home')
    }

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes} : ${seconds}`;
    };

    useEffect(() => {
        setCurrAns(answers[currQ])
    }, [currQ])

    useEffect(() => {
        if (!isActive || time === 0) return;

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = window.setInterval(() => {
            setTime(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isActive]);

    useEffect(() => {
        if (!doingEid || !jwt) return
        const fetchQuestions = async () => {
            try {
                setLoading(true)
                const res = await getExamQuestions(jwt, doingEid.id)
                if (res.status === 200) {
                    setQuestions(res.data)
                    const arr = Array(res.data.length).fill(0).map((_, i) => i + 1)
                    setIndexes(arr)
                    setAnswers(Array(res.data.length).fill('_'))
                }
            } catch (e) {
                console.error('Fetch questions failed.', e)
            } finally {
                setLoading(false)
            }
        }
        fetchQuestions()
    }, [doingEid, jwt])

    return (
        <div className="flex flex-col bg-(--white-bg) h-screen w-screen">
            <div className="h-[60px] w-full bg-(--dark-mint) flex items-center pl-[20px] text-white text-[18px]">
                {doingEid?.title}
            </div>
            <div className="flex-1 flex-row flex p-[30px]">
                <div className="flex flex-col w-[300px] bg-white border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] pt-[15px] pl-[15px] pb-[15px]">
                    <label className="text-[16px] text-[rgba(0,0,0,0.5)] font-medium mb-[20px]">Questions panel</label>
                    <div className="flex flex-row flex-wrap w-full max-h-[600px] overflow-y-auto gap-[10px] custom-scrollbar">
                        {indexes.map((value, idx) => (
                            <div key={idx} className={
                                clsx('flex items-center justify-center aspect-square h-[35px]',
                                    'border-2 rounded-[8px] font-medium cursor-pointer hover:underline',
                                    {
                                        'border-[#598197] bg-[#EAF6FD] text-[#598197]': currQ !== value - 1 && answers[value - 1] !== '_',
                                        'border-(--dark-mint) text-(--dark-mint)': currQ === value - 1,
                                        'border-gray-300 text-gray-500': currQ !== value - 1 && answers[value - 1] === '_'
                                    }
                                )} onClick={() => handleSwitchQuestion(value-1)}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] ml-[30px] mr-[15px] w-[800px]">
                    {loading ? (<div></div>) : <div className="flex flex-col gap-[20px]">
                        <label className="text-[20px] ml-[10px] font-medium text-(--dark-mint)">{`Question ${questions[currQ]?.order}:`}</label>
                        <div className="flex flex-col gap-[20px] pr-[15px] h-[500px] max-h-[500px] overflow-y-auto custom-scrollbar">
                            <div className={
                                clsx("w-full h-fit p-[20px] rounded-[10px] bg-white",
                                    'border-1 border-amber-600'
                                )}>
                                <p className="text-justify text-wrap max-w-full text-[18px]">
                                    {questions[currQ]?.content}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[20px] mt-[20px] ml-[30px]">
                                {questions[currQ]?.choices.map((val) => (
                                    <div key={val.letter} className="flex flex-row gap-[15px] text-[18px] items-center">
                                        <input className="cursor-pointer h-[20px] w-[20px]"
                                            checked={currAns === val.letter} value={val.letter}
                                            type="radio" name={`option-${currQ}`}
                                            onChange={(e) => setCurrAns(e.target.value)} />
                                        <label className="font-semibold">{val.letter}</label>
                                        <p className="max-w-[700px] text-justify">{val.content}</p>
                                    </div>))}
                            </div>
                        </div>
                        <div className="flex flex-row mt-[20px] gap-[15px]">
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--royal-blue) text-white gap-[15px]',
                                    'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                                )
                            } onClick={() => handlePreviousQuestion()}>
                                <FontAwesomeIcon icon={faAngleLeft} />
                                <label>Previous</label>
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--md-red) text-white gap-[15px] ml-auto',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer'
                                )
                            } onClick={() => setCurrAns('_')}>
                                <FontAwesomeIcon icon={faEraser} />
                                <label>Clear answer</label>
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--dark-mint) text-white gap-[10px]',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer'
                                )
                            } onClick={() => handleSaveQuestionAndNext()}>
                                <label>Save and next</label>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </div>
                    </div>}
                </div>
                <div className="flex flex-col gap-[15px] flex-1">
                    <div className="flex flex-col gap-[10px] pt-[10px] pl-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[130px] bg-white">
                        <label className="font-medium text-(--md-red)">Time left:</label>
                        <label className={
                            clsx("font-semibold text-[40px] mr-auto ml-auto",
                                { 'text-black': time > 60, 'text-(--md-red)': time <= 60 }
                            )}>{formatTime(time)}</label>
                    </div>
                    <div className="flex flex-col gap-[5px] pt-[10px] pl-[15px] pr-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[240px] bg-white">
                        <label className="font-medium">Overview</label>
                        <div className="h-[1px] w-full bg-[rgba(0,0,0,0.2)]"></div>
                        <div className="flex flex-col gap-[10px] mt-[15px] w-full">
                            <div className="flex justify-between w-full">
                                <label>Total questions:</label>
                                <label className="font-medium">{doingEid?.noq}</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Answered:</label>
                                <label className="font-medium">{answers.filter(val => val !== '_').length}</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Not answered:</label>
                                <label className="font-medium">{answers.filter(val => val === '_').length}</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[5px] w-full">
                        <div className={
                            clsx('h-[40px] w-1/2 rounded-[8px] flex items-center justify-center',
                                'bg-(--dark-green) text-white hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer',
                            )} onClick={() => handleSubmit()}>
                            Submit
                        </div>
                        <div className={
                            clsx('h-[40px] w-1/2 rounded-[8px] flex items-center justify-center',
                                'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer',
                                'border-2 border-(--md-orange) text-(--md-orange)'
                            )} onClick={() => handleExit()}>
                            Exit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}