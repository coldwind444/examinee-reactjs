import clsx from "clsx"
import s1 from '../../assets/mail.png'
import s2 from '../../assets/otp.png'
import s3 from '../../assets/synchronize.png'
import { useState } from "react"
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

export const PasswordResetPage = () => {
    const [curr, setCurr] = useState(1)
    const navigate = useNavigate()

    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center gap-[50px]')}>
            <div className="flex flex-row gap-[5px] items-center font-medium text-teal-600 cursor-pointer mr-auto ml-[40px]"
                onClick={() => navigate('/auth/login')}>
                <FontAwesomeIcon icon={faAngleLeft}/>
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
                            { 'grayscale-100': curr < 2 }
                        )} />
                    <div className={
                        clsx('h-[8px] w-[170px]',
                            { 'bg-(--md-mint) drop-shadow-teal-500 drop-shadow-md': curr >= 2, 'bg-[#d9d9d9]': curr < 2 }
                        )}></div>
                </div>
                <div className={clsx('flex flex-col items-center gap-[20px]')}>
                    <img src={s3} className={
                        clsx('aspect-square h-[60px]',
                            { 'grayscale-100': curr < 3 }
                        )} />
                    <div className={
                        clsx('h-[8px] w-[170px]',
                            { 'bg-(--md-mint) drop-shadow-teal-500 drop-shadow-md': curr >= 3, 'bg-[#d9d9d9]': curr < 3 }
                        )}></div>
                </div>
            </div>
            <div className={clsx('h-[500px] w-[600px] overflow-hidden')}>
                <div className={
                    clsx('flex flex-row h-full w-3/1 transition-transform duration-300 ease-in',
                        { '-translate-x-1/3': curr === 2, '-translate-x-2/3': curr === 3 }
                    )}>
                    <form className={clsx('flex flex-col h-full w-1/3 items-center gap-[10px]')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)] mb-[30px]')}>Send OTP</label>
                        <CustomTextBox hint="Email" type="text" />
                        <button type="submit" className={
                            clsx('h-[50px] w-[400px] bg-(--royal-blue) font-semibold',
                                'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                            )} onClick={() => setCurr(2)}>
                            <label className="text-white text-[16px]">Send</label>
                        </button>
                    </form>
                    <form className={clsx('flex flex-col h-full w-1/3 items-center gap-[10px]')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)]')}>Verify OTP</label>
                        <label className={clsx('text-[18px] font-medium text-[rgba(0,0,0,0.5)] text-center w-[300px]')}>We have sent an OTP to your email. Please confirm it.</label>
                        <div className={clsx('flex flex-col gap-[10px] mt-[20px]')}>
                            <label className={clsx('mt-[15px] ml-[5px] text-[14px] text-[rgba(0,0,0,0.6)] mr-auto font-normal')}>
                                Haven't received yet ? <span className={clsx('text-(--dodger-blue) cursor-pointer hover:underline')}>Resend OTP</span>
                            </label>
                            <CustomTextBox hint="Enter OTP" type="text" />
                            <button type="submit" className={
                                clsx('h-[50px] w-[400px] bg-(--royal-blue) font-semibold',
                                    'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                                )} onClick={() => setCurr(3)}>
                                <label className="text-white text-[16px]">Verify</label>
                            </button>
                            <label className='text-(--md-red) font-medium ml-auto mr-auto'>{`Expires in 15:00`}</label>
                        </div>
                    </form>
                    <form className={clsx('flex flex-col h-full w-1/3 gap-[10px] items-center')}>
                        <label className={clsx('text-[30px] font-semibold text-[rgba(0,0,0,0.8)] mb-[20px]')}>Reset password</label>
                        <CustomTextBox hint="Password" type="password" />
                        <CustomTextBox hint="Confirm" type="password" />
                        <div className='flex flex-row gap-[15px] mt-[20px]'>
                            <div className={
                                clsx('h-[50px] w-[190px] rounded-[10px] border-2 border-[rgba(0,0,0,0.2)] text-(--md-red)',
                                    'flex items-center justify-center font-medium cursor-pointer',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in'
                                )}>
                                    Cancel
                            </div>
                            <button type="submit" className={
                                clsx('h-[50px] w-[190px] rounded-[10px] bg-(--royal-blue) text-white',
                                    'flex items-center justify-center font-medium cursor-pointer',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in'
                                )} onClick={() => setCurr(1)}>
                                    <label className="text-white">Reset</label>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}