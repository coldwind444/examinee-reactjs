import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faClipboardCheck, faHourglassHalf, faPercentage, faFlag } from "@fortawesome/free-solid-svg-icons"

export const ResultPage = () => {
    const rs = [
        {
            order: 1,
            answer: 'A',
            key: 'A'
        },
        {
            order: 2,
            answer: 'B',
            key: 'B'
        },
        {
            order: 3,
            answer: 'D',
            key: 'A'
        },
        {
            order: 4,
            answer: 'C',
            key: 'C'
        },
        {
            order: 5,
            answer: 'A',
            key: 'A'
        },
    ]

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[22px] font-semibold')}>Đề thi Toán THPTQG</label>
            </div>
            <div className={clsx('flex flex-row gap-[20px]')}>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-[#D3E0FF] relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Result</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#2050C2]" icon={faClipboardCheck} />
                    <label className="text-[#2050C2] ml-auto mr-auto text-[30px] font-medium">170/200</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-(--pale-mint) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Percentage</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#0C8478]" icon={faPercentage} />
                    <label className="text-[#0C8478] ml-auto mr-auto text-[30px] font-medium">85%</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-(--pale-orange) relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Duration</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#D86F0E]" icon={faHourglassHalf} />
                    <label className="text-[#D86F0E] ml-auto mr-auto text-[30px] font-medium">70 : 00</label>
                </div>
                <div className={clsx('flex flex-col pl-[20px] pr-[20px] gap-[15px] h-[120px] w-[250px] rounded-[20px] bg-[#F7DBE4] relative')}>
                    <label className={clsx('text-[18px] font-semibold mt-[10px]')}>Score</label>
                    <FontAwesomeIcon className="absolute text-[20px] mr-[20px] mt-[10px] right-0 text-[#DE3067]" icon={faFlag} />
                    <label className="text-[#DE3067] ml-auto mr-auto text-[30px] font-medium">865</label>
                </div>
            </div>
            <label className="mt-[20px] text-[rgba(0,0,0,0.5)] font-medium">Answers and keys</label>
            <div className="flex flex-row flex-wrap gap-[40px] max-h-[400px] w-9/10 overflow-y-scroll custom-scrollbar">
                {rs.map((val) => (
                    <div key={val.order} className="flex flex-row gap-[15px] items-center">
                        <div className={
                            clsx('aspect-square h-[40px] rounded-full flex items-center justify-center font-semibold',
                                'hover:underline cursor-pointer',
                                {
                                    'bg-[#94E8BB] text-[#09763C]': val.answer === val.key,
                                    'bg-[#FEA6A7] text-[#800507]': val.answer !== val.key
                                }
                            )}>{val.order}</div>
                        <label>Yours: <b>{val.answer}</b> - Key: <b>{val.key}</b></label>
                    </div>
                ))}
            </div>
        </div>
    )
}