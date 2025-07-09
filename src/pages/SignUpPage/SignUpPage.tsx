import clsx from "clsx"
import logo from '../../assets/checked.png'
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { userRegister } from "../../apis/user"

export const SignUpPage = () => {
    const navigate = useNavigate()
    const formRef = useRef<HTMLFormElement>(null)

    const [email, setEmail] = useState('')
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const [loading, setLoading] = useState(false)

    const validData = () => {
        return email.length > 0 && fname.length > 0 && lname.length > 0 && 
                password.length > 0 && password === confirm
    }

    const handleRegister = async (e : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!validData() || loading) return
        try {
            setLoading(true)
            const res = await userRegister({ email, password, fname, lname })
            if (res.status === 200) {
                navigate('/auth/login')
                formRef.current?.reset()
            }
        } catch (err) {
            console.error('Register fail.', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center')}>
            <img src={logo} className={clsx('w-[45px] h-[45px] mb-[10px]')} />
            <label className={clsx('text-[32px] font-semibold')}>Create new EXAMINEE account</label>
            <label className={clsx('text-[20px] font-normal text-[#5C5656]')}>Become our new member to start doing online tests</label>
            <form ref={formRef} className={clsx('flex flex-col gap-[10px] mt-[40px]')}>
                <CustomTextBox hint="Email" type="text" onChange={(e) => setEmail(e.target.value)}/>
                <div className={clsx('flex flex-row gap-[10px]')}>
                    <CustomTextBox hint="First name" type="text" width="195px" onChange={(e) => setFname(e.target.value)}/>
                    <CustomTextBox hint="Last name" type="text" width="195px" onChange={(e) => setLname(e.target.value)}/>
                </div>
                <CustomTextBox hint="Password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <CustomTextBox hint="Confirm" type="password" onChange={(e) => setConfirm(e.target.value)}/>
                <button type="submit" onClick={(e) => handleRegister(e)} className={
                    clsx('h-[50px] w-[400px] bg-(--md-purple) font-semibold',
                        'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                    )}>
                    <label className="text-white text-[16px]">Sign up</label>
                </button>
                {loading&&<div className="absolute translate-y-[252px] translate-x-[350px]">
                    <span className="loader"></span>
                </div>}
            </form>
            <label className={clsx('mt-[15px] text-[14px] text-[rgba(0,0,0,0.6)] font-medium')}>
                Already have an account ? <span className={clsx('text-(--md-orange) cursor-pointer hover:underline')} 
                onClick={() => {formRef.current?.reset(); navigate('/auth/login')}}>Log in</span>
            </label>
        </div>
    )
}