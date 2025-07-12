import clsx from "clsx"
import logo from '../../assets/checked.png'
import google from '../../assets/search.png'
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { Link, useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { useAuth } from "../../providers/AuthContext"

export const LoginPage = () => {
    const { login, jwtLoading } = useAuth()

    const formRef = useRef<HTMLFormElement>(null)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (email.length === 0 && password.length === 0) return
        login({ email, password })
        formRef.current?.reset()
    }

    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center')}>
            <img src={logo} className={clsx('w-[45px] h-[45px] mb-[10px]')} />
            <label className={clsx('text-[32px] font-semibold')}>Welcome back to EXAMINEE</label>
            <label className={clsx('text-[20px] font-normal text-[#5C5656]')}>Let's review your lessons by doing some tests !</label>
            <form ref={formRef} className={clsx('flex flex-col gap-[10px] mt-[40px]')}>
                <CustomTextBox hint="Email" type="text" onChange={(e) => setEmail(e.target.value)}/>
                <CustomTextBox hint="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <Link className={
                    clsx('text-(--md-purple) text-[16px] ml-[10px] font-semibold cursor-pointer hover:underline',
                        'mb-[20px] mt-[5px]'
                    )} to='/auth/password-reset'>
                    Forgot password ?
                </Link>
                <button type="submit" onClick={(e) => handleLogin(e)} className={
                    clsx('h-[50px] w-[400px] bg-(--dark-mint) font-semibold',
                        'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                    )}>
                    <label className="text-white text-[16px]">Log in</label>
                </button>
                {jwtLoading&&<div className="absolute translate-y-[190px] translate-x-[350px]">
                    <span className="loader"></span>
                </div>}
                <div className={clsx('h-[1px] w-[400px] bg-[rgba(0,0,0,0.2)] mt-[10px] relative')}>
                    <label className={
                        clsx('translate-x-[185px] -translate-y-[12px] absolute',
                            'bg-(--white-bg) pl-[10px] pr-[10px] text-[rgba(0,0,0,0.3)] font-semibold'
                        )}>Or
                    </label>
                </div>
            </form>
            <a className={
                clsx('flex flex-row items-center justify-center h-[50px] w-[400px] bg-(--gray-green) font-semibold',
                    'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150 mt-[20px] gap-[20px]'
                )} href="'http://localhost:3000/auth/google/login'">
                <img src={google} className={clsx('aspect-square h-[20px]')} />
                <label className="text-black text-[16px]">Continue with Google</label>
            </a>
            <label className={clsx('mt-[15px] text-[14px] text-[rgba(0,0,0,0.6)] font-medium')}>
                Don't have an account ? <span className={clsx('text-(--md-orange) cursor-pointer hover:underline')} 
                onClick={() => {formRef.current?.reset(); navigate('/auth/signup')}}>Sign up</span>
            </label>
        </div>
    )
}