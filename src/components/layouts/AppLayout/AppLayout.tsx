import clsx from "clsx"
import logo from '../../../assets/checked.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faClose, faCube, faHistory, faHome, faPenClip, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import { faBell } from "@fortawesome/free-regular-svg-icons"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { useUser } from "../../../providers/UserContext"
import { useAuth } from "../../../providers/AuthContext"

export const AppLayout = () => {
    const { logout } = useAuth()
    const { user } = useUser()

    const navigate = useNavigate()
    const location = useLocation()

    const [popup, setPopup] = useState(false)

    const q = {
        order: 1,
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        choices: ['Something A', 'Something B', 'Something C', 'Something D'],
        key: 'A',
        answer: 'A'
    }

    return (
        <div className={clsx('flex flex-row h-screen w-screen bg-(--white-bg)')}>
            <div className={
                clsx('flex flex-col gap-[40px] border-1 border-[rgba(0,0,0,0.2)]',
                    'h-full w-[250px] pl-[20px]'
                )}>
                <div className={clsx('flex flex-row gap-[10px] mt-[20px] items-center')}>
                    <img src={logo} className="h-[30px] w-[30px]" />
                    <label className='font-(family-name:--itim-font) text-[18px]'>
                        EXAM<span className="text-(--md-green)">INEE</span>
                    </label>
                </div>
                <label className='text-[rgba(0,0,0,0.6)]'>Main menu</label>
                <div className={clsx('flex flex-col gap-[10px]')}>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': location.pathname === '/app/home' }
                        )} onClick={() => navigate('/app/home')}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': location.pathname === '/app/home' })} icon={faHome} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': location.pathname === '/app/home' })}>Home</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': location.pathname === '/app/library' }
                        )} onClick={() => navigate('/app/library')}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': location.pathname === '/app/library' })} icon={faCube} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': location.pathname === '/app/library' })}>Library</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': location.pathname === '/app/my-exams' }
                        )} onClick={() => navigate('/app/my-exams')}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': location.pathname.startsWith('/app/my-exams') })} icon={faPenClip} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': location.pathname.startsWith('/app/my-exams') })}>My exams</label>
                    </div>
                    <div className={
                        clsx('flex flex-row gap-[30px] h-[50px] w-[210px] items-center text-[18px]',
                            'rounded-[25px] cursor-pointer hover:text-(--md-mint) transition-colors duration-100 ease-in',
                            { 'bg-(--tab-hover-bg)': location.pathname === '/app/history' }
                        )} onClick={() => navigate('/app/history')}>
                        <FontAwesomeIcon className={clsx("ml-[20px]", { 'text-(--md-mint)': location.pathname.startsWith('/app/history') })} icon={faHistory} />
                        <label className={clsx({ 'text-(--md-mint) font-semibold': location.pathname.startsWith('/app/history') })}>History</label>
                    </div>
                </div>
            </div>
            <div className={clsx('flex flex-1 flex-col')}>
                <div className="flex h-[80px] w-full border-l-0 border-1 border-[rgba(0,0,0,0.2)]">
                    <div className={clsx('flex flex-row gap-[15px] h-full ml-auto items-center')}>
                        <div className={
                            clsx('flex items-center justify-center h-[45px] w-[45px]',
                                'bg-[#E3E3E3] rounded-[20px] relative'
                            )}>
                            <div className={
                                clsx('h-[12px] w-[12px] bg-rose-300 rounded-full absolute',
                                    'translate-x-[15px] -translate-y-[17px] animate-ping'
                                )} />
                            <div className={
                                clsx('h-[10px] w-[10px] bg-rose-500 rounded-full absolute',
                                    'translate-x-[15px] -translate-y-[17px]'
                                )} />
                            <FontAwesomeIcon className="text-[18px]" icon={faBell} />
                        </div>
                        <div className={
                            clsx('flex items-center justify-center font-semibold ',
                                'bg-(--pale-orange) h-[55px] w-[55px] rounded-full text-[20px]'
                            )}>
                            {user?.fname.charAt(0)}
                        </div>
                        <label className="font-medium">{`${user?.fname} ${user?.lname}`}</label>
                        <div className={clsx('cursor-pointer mr-[50px] text-(--md-red)')}
                            onClick={() => logout()}>
                            <FontAwesomeIcon icon={faSignOut} />
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>
            <div className={
                clsx("flex items-center justify-center absolute h-screen w-screen", { 'hidden': !popup , 'visible': popup})}>
                <div className="h-full w-full bg-[rgba(0,0,0,0.5)]" onClick={() => setPopup(false)}></div>
                <div className={clsx('flex flex-col absolute  h-[500px] w-[900px] bg-(--white-bg) rounded-[10px] p-[15px]')}>
                    <FontAwesomeIcon className="ml-auto cursor-pointer" icon={faClose} onClick={() => setPopup(false)}/>
                    <label className="ml-[30px] mt-[10px] text-[18px] font-medium text-(--dark-mint)">{`Question ${q.order}:`}</label>
                    <div className="ml-[30px] mt-[30px] flex flex-col gap-[20px] overflow-y-scroll custom-scrollbar">
                        <p className="text-justify text-wrap w-[800px] font-medium">
                            {q.content}
                        </p>
                        <div className="flex flex-col gap-[20px] mt-[10px] ml-[20px]">
                            {q.choices.map((val, idx) => {
                                const letter = String.fromCharCode(idx+65)
                                const isCorrectAnswer = letter === q.key;
                                const isUserAnswer = letter === q.answer;
                                const isCorrect = q.key === q.answer;

                                return (
                                    <div key={idx} className="flex flex-row gap-[15px] items-start">
                                        <label
                                            className={clsx("font-semibold", {
                                                "text-(--dark-green)": isCorrectAnswer,
                                                "text-(--md-red)": !isCorrect && isUserAnswer,
                                            })}
                                        >
                                            {`${letter}.`}
                                        </label>

                                        <label
                                            className={clsx("font-medium", {
                                                "text-(--dark-green)": isCorrectAnswer,
                                                "text-(--md-red)": !isCorrect && isUserAnswer,
                                            })}
                                        >
                                            {val}
                                        </label>

                                        {isUserAnswer && (
                                            <div className="flex flex-row ml-[15px] gap-[10px] items-center">
                                                <FontAwesomeIcon
                                                    className={clsx({
                                                        "text-(--dark-green)": isCorrect,
                                                        "text-(--md-red)": !isCorrect,
                                                    })}
                                                    icon={isCorrect ? faCheck : faClose}
                                                />
                                                <label className="font-semibold">
                                                    {isCorrect ? "Correct" : "Incorrect"}
                                                </label>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}