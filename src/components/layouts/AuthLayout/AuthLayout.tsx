import clsx from "clsx"
import sideImg from '../../../assets/side_img.jpg'
import { Outlet } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons"

export const AuthLayout = () => {
    return (
        <div className={clsx('flex flex-row h-screen w-screen bg-(--white-bg)')}>
            <img src={sideImg}/>
            <div className={
                clsx('absolute flex flex-row gap-[10px] text-[18px] text-[rgba(255,255,255,0.8)] items-center',
                    'mt-[20px] ml-[20px]'
            )}>
                <FontAwesomeIcon icon={faCheckCircle}/>
                <span className={clsx('font-(family-name:--itim-font)')}>EXAMINEE</span>
            </div>
            <div className={clsx('flex-1')}>
                <Outlet/>
            </div>
        </div>
    )
}