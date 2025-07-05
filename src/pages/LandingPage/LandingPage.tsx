import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { } from '@fortawesome/free-regular-svg-icons'
import { faAngleRight, faArrowDown, faCheckDouble, faClockRotateLeft, faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import logo from '../../assets/checked.png'
import study from '../../assets/study.png'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

export const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div className='flex flex-col h-screen w-screen bg-(--white-bg)'>
            <div className='flex flex-row gap-[10px] items-center mt-[10px] ml-[10px]'>
                <img className='aspect-square h-[35px]' src={logo} />
                <span className='font-(family-name:--itim-font) text-[20px]'>EXAM
                    <span className='text-(--md-green)'>INEE</span>
                </span>
                <div className={
                    clsx('flex items-center justify-center ml-auto h-[45px] w-[150px]',
                        'border-2 border-(--md-orange) text-(--md-orange) rounded-[10px]',
                        'font-medium hover:bg-(--md-orange) hover:text-white',
                        'transition-colors duration-150 ease-in cursor-pointer'
                    )} onClick={() => navigate('/auth/signup')}>
                    SIGN UP
                </div>
                <div className={
                    clsx('flex items-center justify-center h-[45px] w-[150px]',
                        'text-white rounded-[10px] bg-(--dark-mint)',
                        'font-medium hover:opacity-90 cursor-pointer',
                        'transition-opacity duration-150 ease-in mr-[20px]'
                    )} onClick={() => navigate('/auth/login')}>
                    LOG IN
                </div>
            </div>
            <div className={clsx('flex flex-1 flex-row items-center')}>
                <div className='flex flex-col gap-[20px] ml-[40px]'>
                    <span className='h-[15px] w-[100px] bg-(--decorate-green) absolute translate-y-[25px] translate-x-[235px] z-0'></span>
                    <h2 className={clsx('text-[30px] w-[600px] font-(family-name:--poppins-font) font-semibold z-10')}>
                        Welcome to EXAMINEE – your reliable partner for secure, flexible, and fully online exams.
                    </h2>
                    <div className={
                        clsx('flex flex-row gap-[10px] bg-(--dark-mint) text-white items-center text-[20px]',
                            'h-[50px] w-[350px] rounded-[25px] justify-center',
                            'hover:gap-[30px] transition-[gap] duration-150 ease-in cursor-pointer'
                        )} onClick={() => navigate('/auth/login')}>
                        <label>Start your exam journey today !</label>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </div>
                    <div className='flex flex-col gap-[10px]'>
                        <div className='flex flex-row gap-[10px]'>
                            <div className={
                                clsx('flex flex-col items-center justify-center h-[170px] w-[170px] border-2 rounded-[15px]',
                                    'border-(--light-orange) font-semibold text-[20px] text-(--light-orange) gap-[10px]'
                                )}>
                                <FontAwesomeIcon className='text-[35px]' icon={faArrowDown} />
                                <label>No downloads</label>
                            </div>
                            <div className={
                                clsx('flex flex-col items-center justify-center h-[170px] w-[170px] border-2 rounded-[15px]',
                                    'border-(--deep-pink) font-semibold text-[20px] text-(--deep-pink) gap-[10px]'
                                )}>
                                <FontAwesomeIcon className='text-[35px]' icon={faClockRotateLeft} />
                                <label className='text-center'>Real-Time Monitoring</label>
                            </div>
                            <div className={
                                clsx('flex flex-col items-center justify-center h-[170px] w-[170px] border-2 rounded-[15px]',
                                    'border-(--md-mint) font-semibold text-[20px] text-(--md-mint) gap-[10px]'
                                )}>
                                <FontAwesomeIcon className='text-[35px]' icon={faCheckDouble} />
                                <label>Instant Results</label>
                            </div>
                        </div>
                        <div className={
                            clsx('flex flex-row items-center justify-around h-[170px] w-[530px] border-2 rounded-[15px]',
                                'border-(--dark-blue) font-semibold text-[20px] text-(--dark-blue)'
                            )}>
                            <FontAwesomeIcon className='text-[35px]' icon={faGraduationCap} />
                            <label className='w-[300px]'>Ideal for those who are preparing for examinations.</label>
                        </div>
                    </div>
                </div>
                <div>
                    <img src={study} className='aspect-[1077/742] h-[600px]' />
                </div>
            </div>
        </div>
    )
}