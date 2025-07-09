import clsx from "clsx"
import s1 from '../../assets/mail.png'
import s2 from '../../assets/otp.png'
import s3 from '../../assets/synchronize.png'
import { useState, useRef, useEffect } from "react"
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { requestOtp, confirmOtp, resetPassword } from "../../apis/auth"

export const PasswordResetPage = () => {
    const [step, setStep] = useState(1)
    const navigate = useNavigate()

    const [userid, setUserid] = useState(0)

    const formS1Ref = useRef<HTMLFormElement>(null)
    const formS2Ref = useRef<HTMLFormElement>(null)
    const formS3Ref = useRef<HTMLFormElement>(null)

    const [email, setEmail] = useState('')
    const [loadingS1, setLoadingS1] = useState(false)

    const [otp, setOtp] = useState('')
    const [loadingS2, setLoadingS2] = useState(false)
    const [token, setToken] = useState('')

    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loadingS3, setLoadingS3] = useState(false)

    const [time, setTime] = useState(15 * 60)
    const [isActive, setIsActive] = useState(false)

    const resetForms = () => {
        formS1Ref.current?.reset()
        formS2Ref.current?.reset()
        formS3Ref.current?.reset()
    }

    const handleSendOTP = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (loadingS1) return
        if (email.length === 0) return
        try {
            setLoadingS1(true)
            const res = await requestOtp(email)
            if (res.status === 200) {
                setStep(2)
                setUserid(res.data.userid)
                startCountDown()
            }
        } catch (e) {
            console.error('Send OTP failed.', e)
        } finally {
            setLoadingS1(false)
        }
    }

    const handleVerifyOTP = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (loadingS2) return
        if (!userid || otp.length < 6) return
        try {
            setLoadingS2(true)
            const res = await confirmOtp({
                otp: Number.parseInt(otp),
                userid: userid
            })
            if (res.status === 200) {
                setToken(res.data)
                setStep(3)
            }
        } catch (e) {
            console.error('Verify OTP failed.', e)
        } finally {
            setLoadingS2(false)
        }
    }

    const handleResetPassword = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (loadingS3) return
        if (!userid || password.length === 0 || password !== confirm) return
        try {
            setLoadingS3(true)
            const res = await resetPassword({
                token: token,
                password: password,
                userid: userid
            })
            if (res.status === 200) {
                setStep(3)
                stopAndResetCountDown()
                navigate('/')
                resetForms()
            }
        } catch (e) {
            console.error('Reset failed.', e)
        } finally {
            setLoadingS3(false)
        }
    }

    const startCountDown = () => {
        setTime(15 * 60)
        setIsActive(true)
    }

    const stopAndResetCountDown = () => {
        setIsActive(false)
        setTime(15 * 60)
    }

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
        const seconds = (totalSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    useEffect(() => {
        if (!isActive || time <= 0) return
        const interval = setInterval(() => setTime(prev => prev - 1), 1000)
        return () => clearInterval(interval)
    }, [isActive, time])

    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center gap-[50px]')}>
            <div className="flex flex-row gap-[5px] items-center font-medium text-teal-600 cursor-pointer mr-auto ml-[40px]"
                onClick={() => {resetForms(); navigate('/auth/login')}}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label>Back to authentication</label>
            </div>
            <div className={clsx('flex flex-row gap-[10px]')}>
                <div className={clsx('flex flex-col items-center gap-[20px]')}>
                    <img src={s1} className={
                        clsx('aspect-square h-[60px]')} />
                    <div className={
                        clsx('h-[8px] w-[170px]',
                            { 'bg-(--md-mint) drop-shadow-teal-500 drop-shadow-md': true, 'bg-[#d9d9d9]': false }
                        )}></div>
                </div>
                <div className={clsx('flex flex-col items-center gap-[20px]')}>
                    <img src={s2} className={
                        clsx('aspect-square h-[60px]',
                            { 'grayscale-100': step < 2 }
                        )} />
                    <div className={
                        clsx('h-[8px] w-[170px]',
                            { 'bg-(--md-mint) drop-shadow-teal-500 drop-shadow-md': step >= 2, 'bg-[#d9d9d9]': step < 2 }
                        )}></div>
                </div>
                <div className={clsx('flex flex-col items-center gap-[20px]')}>
                    <img src={s3} className={
                        clsx('aspect-square h-[60px]',
                            { 'grayscale-100': step < 3 }
                        )} />
                    <div className={
                        clsx('h-[8px] w-[170px]',
                            { 'bg-(--md-mint) drop-shadow-teal-500 drop-shadow-md': step >= 3, 'bg-[#d9d9d9]': step < 3 }
                        )}></div>
                </div>
            </div>
            <div className={clsx('h-[500px] w-[600px] overflow-hidden')}>
                <div className={
                    clsx('flex flex-row h-full w-3/1 transition-transform duration-300 ease-in',
                        { '-translate-x-1/3': step === 2, '-translate-x-2/3': step === 3 }
                    )}>
                    <form ref={formS1Ref} className={clsx('flex flex-col h-full w-1/3 items-center gap-[10px]')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)] mb-[30px]')}>Send OTP</label>
                        <CustomTextBox hint="Email" type="text" onChange={(e) => setEmail(e.target.value)}/>
                        <button type="submit" className={
                            clsx('h-[50px] w-[400px] bg-(--royal-blue) font-semibold',
                                'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                            )} onClick={(e) => handleSendOTP(e)}>
                            <label className="text-white text-[16px]">Send</label>
                        </button>
                    </form>
                    <form ref={formS2Ref} className={clsx('flex flex-col h-full w-1/3 items-center gap-[10px]')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)]')}>Verify OTP</label>
                        <label className={clsx('text-[18px] font-medium text-[rgba(0,0,0,0.5)] text-center w-[300px]')}>We have sent an OTP to your email. Please confirm it.</label>
                        <div className={clsx('flex flex-col gap-[10px] mt-[20px]')}>
                            <label className={clsx('mt-[15px] ml-[5px] text-[14px] text-[rgba(0,0,0,0.6)] mr-auto font-normal')}>
                                Haven't received yet ? <span className={clsx('text-(--dodger-blue) cursor-pointer hover:underline')}>Resend OTP</span>
                            </label>
                            <CustomTextBox hint="Enter OTP" type="text" max={6} onChange={(e) => setOtp(e.target.value)}/>
                            <button type="submit" className={
                                clsx('h-[50px] w-[400px] bg-(--royal-blue) font-semibold',
                                    'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                                )} onClick={(e) => handleVerifyOTP(e)}>
                                <label className="text-white text-[16px]">Verify</label>
                            </button>
                            <label className='text-(--md-red) font-medium ml-auto mr-auto'>{`Expires in ${formatTime(time)}`}</label>
                        </div>
                    </form>
                    <form ref={formS3Ref} className={clsx('flex flex-col h-full w-1/3 gap-[10px] items-center')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)] mb-[20px]')}>Reset password</label>
                        <CustomTextBox hint="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        <CustomTextBox hint="Confirm" type="password" onChange={(e) => setConfirm(e.target.value)}/>
                        <div className='flex flex-row gap-[15px] mt-[20px]'>
                            <div className={
                                clsx('h-[50px] w-[190px] rounded-[10px] border-2 border-[rgba(0,0,0,0.2)] text-(--md-red)',
                                    'flex items-center justify-center font-medium cursor-pointer',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in'
                                )} onClick={() => { resetForms(), setStep(1) }}>
                                Cancel
                            </div>
                            <button type="submit" className={
                                clsx('h-[50px] w-[190px] rounded-[10px] bg-(--royal-blue) text-white',
                                    'flex items-center justify-center font-medium cursor-pointer',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in'
                                )} onClick={(e) => handleResetPassword(e)}>
                                <label className="text-white">Reset</label>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}