import clsx from "clsx"
import logo from '../../assets/checked.png'
import google from '../../assets/search.png'
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { Link } from "react-router-dom"

export const LoginPage = () => {
    return (
        <div className={clsx('flex flex-col h-full w-full items-center justify-center')}>
            <img src={logo} className={clsx('w-[45px] h-[45px] mb-[10px]')} />
            <label className={clsx('text-[32px] font-semibold')}>Welcome back to EXAMINEE</label>
            <label className={clsx('text-[20px] font-normal text-[#5C5656]')}>Let's review your lessons by doing some tests !</label>
            <form className={clsx('flex flex-col gap-[10px] mt-[40px]')}>
                <CustomTextBox hint="Email" type="text" />
                <CustomTextBox hint="Password" type="password" />
                <Link className={
                    clsx('text-(--md-purple) text-[16px] ml-[10px] font-semibold cursor-pointer hover:underline',
                        'mb-[20px] mt-[5px]'
                    )}
                    to='/auth/password-reset'>
                    Forgot password ?
                </Link>
                <button type="submit" className={
                    clsx('h-[50px] w-[400px] bg-(--dark-mint) font-semibold',
                        'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150'
                    )}>
                    <label className="text-white text-[16px]">Log in</label>
                </button>
                <div className={clsx('h-[1px] w-[400px] bg-[rgba(0,0,0,0.2)] mt-[10px] relative')}>
                    <label className={
                        clsx('translate-x-[185px] -translate-y-[12px] absolute',
                            'bg-(--white-bg) pl-[10px] pr-[10px] text-[rgba(0,0,0,0.3)] font-semibold'
                        )}>Or
                    </label>
                </div>
            </form>
            <div className={
                clsx('flex flex-row items-center justify-center h-[50px] w-[400px] bg-(--gray-green) font-semibold',
                    'rounded-[8px] cursor-pointer hover:opacity-90 transition-opacity duration-150 mt-[20px] gap-[20px]'
                )}>
                <img src={google} className={clsx('aspect-square h-[20px]')} />
                <label className="text-black text-[16px]">Continue with Google</label>
            </div>
            <label className={clsx('mt-[15px] text-[14px] text-[rgba(0,0,0,0.6)] font-medium')}>
                Don't have an account ? <span className={clsx('text-(--md-orange) cursor-pointer hover:underline')}>Sign up</span>
            </label>
        </div>
    )
}