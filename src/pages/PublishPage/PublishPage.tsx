import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { CustomComboBox } from "../../components/CustomComboBox/CustomComboBox"
import { CustomFileInput } from "../../components/CustomFileInput/CustomFileInput"
import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../providers/AuthContext"
import { getAllSubs, getExamQuestions, uploadExamViaExcel } from "../../apis/exam"
import type { Subject } from "../../models/responses/exam/Subject"
import type { Question } from "../../models/responses/question/Question"
import { useNavigate } from "react-router-dom"

export const PublishPage = () => {
    const { jwt } = useAuth()
    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [scale, setScale] = useState('')
    const [noc, setNoc] = useState('')
    const [noq, setNoq] = useState('')
    const [duration, setDuration] = useState('')
    const [subject, setSubject] = useState('')
    const [file, setFile] = useState<File|undefined>()

    const [examId, setExamId] = useState<number | undefined>()
    const [questions, setQuestions] = useState<Question[]>([])
    const [currQ, setCurrQ] = useState(0)
    const [subs, setSubs] = useState<Subject[]>()

    const [loading, setLoading] = useState(false)

    const handleSwitchQuestion = (next: boolean) => {
        if (next) {
            if (currQ < questions.length - 1) setCurrQ(prev => prev + 1)
        } else {
            if (currQ > 0) setCurrQ(prev => prev - 1)
        }
    }

    const getFileName = (f: File | undefined) => {
        setFile(f)
    }

    const validData = () => {
        return file && title.length > 0 && noc.length > 0 && noq.length > 0 && scale.length > 0 && duration.length > 0
            && subject.length > 0
    }

    const handleAddExam = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!validData()) return
        try {
            const formData = new FormData()
            console.log(file)
            if (file) formData.append('file', file)
            formData.append('title', title)
            formData.append('cpq', noc)
            formData.append('subject', subject)
            formData.append('noq', noq)
            formData.append('scale', scale)
            formData.append('duration', duration)
            setLoading(true)
            const res = await uploadExamViaExcel(jwt, formData)
            if (res.status === 200) setExamId(res.data.id)
        } catch (e) {
            console.error('Adding failed.', e)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!jwt || !examId) return
        const fetchQuestions = async () => {
            try {
                const res = await getExamQuestions(jwt, examId)
                if (res.status === 200) setQuestions(res.data)
            } catch (e) {
                console.error('Fetch question failed', e)
            }
        }
        fetchQuestions()
    }, [examId, jwt])

    useEffect(() => {
        if (!jwt) return
        const fetchSubs = async () => {
            try {
                const res = await getAllSubs(jwt)
                if (res.status === 200) setSubs(res.data)
            } catch (e) {
                console.error('Fetch subjects failed.', e)
            }
        }

        fetchSubs()
    }, [jwt])

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')} onClick={() => navigate('/app/my-exams')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[20px] font-semibold')}>Publish new exam</label>
            </div>
            <div className={clsx('flex flex-row gap-[60px]')}>
                <form ref={formRef} className={clsx('flex flex-col gap-[15px]')}>
                    <div className="flex flex-col gap-[5px]">
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Exam title</label>
                        <CustomTextBox height="40px" width="100%" type="text" hint="Enter exam title"
                            onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Subject</label>
                        <CustomComboBox hint="Select a subject" height="40px" width="100%"
                            dataList={subs?.map(val => val.name)} onChange={e => setSubject(e.target.value)} />
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Scale</label>
                        <CustomTextBox type="number" hint="Maximum score of your exam, (ex: 100)"
                            height="40px" width="100%" onChange={e => setScale(e.target.value)} />

                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Number</label>
                        <div className="flex flex-row gap-[10px] w-full">
                            <CustomTextBox type="number" hint="Choices" height="40px" width="100%"
                                onChange={e => setNoc(e.target.value)} />
                            <CustomTextBox type="number" hint="Questions" height="40px" width="100%"
                                onChange={e => setNoq(e.target.value)} />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Duration</label>
                        <div className="flex flex-row gap-[10px] items-center">
                            <CustomTextBox type="number" hint="Time limit for your exam (ex: 120)" height="40px" width="300px"
                                onChange={e => setDuration(e.target.value)} />
                            <label className="font-medium text-[rgba(0,0,0,0.5)]">minutes</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Exam file</label>
                        <CustomFileInput height="40px" width="100%" hint="Select an .xlsx file" passFileName={getFileName} />
                    </div>
                    <div className="flex flex-row mt-[15px] w-full justify-between">
                        <button onClick={() => formRef.current?.reset()} className={
                            clsx("h-[40px] w-[200px] border-2 border-(--md-red) rounded-[8px]",
                                'hover:opacity-90 duration-100 ease-in cursor-pointer'
                            )}>
                            <label className="text-(--md-red)">Clear all</label>
                        </button>
                        <button onClick={e => handleAddExam(e)}
                            className={
                                clsx("h-[40px] w-[200px] bg-(--dark-green) rounded-[8px]",
                                    'hover:opacity-90 duration-100 ease-in cursor-pointer'
                                )}>
                            <label className="text-white">Publish</label>
                        </button>
                        {loading&&<div className="absolute translate-x-[390px] translate-y-[7px]">
                            <span className="loader"></span>
                        </div>}
                    </div>
                </form>
                <div className="flex flex-col border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[560px] w-[700px]">
                    <div className="h-[40px] w-full rounded-tl-[10px] rounded-tr-[10px] bg-(--dark-mint) flex flex-row justify-between items-center pl-[15px] pr-[15px] text-white">
                        <label>Preview</label>
                        <div className="flex flex-row gap-[15px]">
                            <FontAwesomeIcon className="cursor-pointer" icon={faAngleLeft} onClick={() => handleSwitchQuestion(false)} />
                            <FontAwesomeIcon className="cursor-pointer" icon={faAngleRight} onClick={() => handleSwitchQuestion(true)} />
                        </div>
                    </div>
                    {questions ?
                        (<div className="flex flex-1 flex-col p-[30px] overflow-y-auto custom-scrollbar">
                            <label className="text-[16px] ml-[10px] font-medium text-(--dark-mint)">{`Question ${questions[currQ]?.order}:`}</label>
                            <div className="flex flex-col gap-[20px] pr-[15px] mt-[20px]">
                                <div className={
                                    clsx("w-full h-fit p-[20px] rounded-[10px] bg-white",
                                        'border-1 border-amber-600'
                                    )}>
                                    <p className="text-justify text-wrap max-w-full text-[16px]">
                                        {questions[currQ]?.content}
                                    </p>
                                </div>
                                <div className="flex flex-col gap-[20px] mt-[20px] ml-[30px]">
                                    {questions[currQ]?.choices.map((val) => (
                                        <div className="flex flex-row gap-[15px] text-[16px] items-center">
                                            <input className="cursor-pointer h-[20px] w-[20px]" disabled
                                                type="radio" name="option" />
                                            <label className="font-semibold">{val.letter}</label>
                                            <p className="max-w-[700px] text-justify">{val.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>) :
                        (
                            <div className="flex flex-1 flex-col p-[30px] text-[rgba(0,0,0,0.5)] font-medium items-center justify-center">No exam to preview</div>
                        )}
                </div>
            </div>
        </div>
    )
}