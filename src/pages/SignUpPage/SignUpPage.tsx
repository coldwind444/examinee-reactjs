import clsx from "clsx"
import logo from '../../assets/checked.png'
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"

export const SignUpPage = () => {
    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center')}>
            <img src={logo} className={clsx('w-[45px] h-[45px] mb-[10px]')} />
            <label className={clsx('text-[32px] font-semibold')}>Create new EXAMINEE account</label>
            <label className={clsx('text-[20px] font-normal text-[#5C5656]')}>Become our new member to start doing online tests</label>
            <form className={clsx('flex flex-col gap-[10px] mt-[40px]')}>
                <CustomTextBox hint="Email" type="text" />
                <div className={clsx('flex flex-row gap-[10px]')}>
                    <CustomTextBox hint="First name" type="text" width="195px"/>
                    <CustomTextBox hint="Last name" type="text" width="195px"/>
                </div>
                <CustomTextBox hint="Password" type="password" />
                <CustomTextBox hint="Confirm" type="password" />
                <button type="submit" className={
                    clsx('h-[50px] w-[400px] bg-(--md-purple) font-semibold',
                        'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                    )}>
                    <label className="text-white text-[16px]">Sign up</label>
                </button>
            </form>
            <label className={clsx('mt-[15px] text-[14px] text-[rgba(0,0,0,0.6)] font-medium')}>
                Already have an account ? <span className={clsx('text-(--md-orange) cursor-pointer hover:underline')}>Log in</span>
            </label>
        </div>
    )
}