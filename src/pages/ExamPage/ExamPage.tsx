import { faAngleLeft, faAngleRight, faEraser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"

export const ExamPage = () => {
    const questions = [
        {
            order: 1,
            content: 'Xác định thành ngữ trong đoạn văn sau: "Lí Thông lân la gợi chuyện, rồi gạ cùng Thạch Sanh kết nghĩa anh em. Sớm mồ côi cha mẹ, tứ cố vô thân, nay có người săn sóc đến mình, Thạch Sanh cảm động, vui vẻ nhận lời"',
            a: ' Kết nghĩa anh em.',
            b: ' Mồ côi cha mẹ.',
            c: ' Tứ cố vô thân.',
            d: ' Đoạn văn trên không có thành ngữ.'
        }
    ]
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
        <div className="flex flex-col bg-(--white-bg) h-screen w-screen">
            <div className="h-[60px] w-full bg-(--dark-mint) flex items-center pl-[20px] text-white text-[18px]">
                Đề thi THPTQG môn Ngữ Văn
            </div>
            <div className="flex-1 flex-row flex p-[30px]">
                <div className="flex flex-col w-[300px] bg-white border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] pt-[15px] pl-[15px] pb-[15px]">
                    <label className="text-[16px] text-[rgba(0,0,0,0.5)] font-medium mb-[20px]">Questions panel</label>
                    <div className="flex flex-row flex-wrap w-full max-h-[600px] overflow-y-auto gap-[10px] custom-scrollbar">
                        {arr.map((value, idx) => (
                            <div key={idx} className={
                                clsx('flex items-center justify-center aspect-square h-[35px]',
                                    'border-2 rounded-[8px] font-medium cursor-pointer hover:underline',
                                    {
                                        'border-[#598197] bg-[#EAF6FD] text-[#598197]': true,
                                        'border-(--dark-mint) text-(--dark-mint)': false,
                                        'border-gray-300 text-gray-500': false
                                    }
                                )}>
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[20px] ml-[30px] mr-[15px] w-[800px]">
                    <div className="flex flex-col gap-[20px]">
                        <label className="text-[20px] ml-[10px] font-medium text-(--dark-mint)">{`Question ${questions[0].order}:`}</label>
                        <div className="flex flex-col gap-[20px] pr-[15px] h-[500px] max-h-[500px] overflow-y-auto custom-scrollbar">
                            <div className={
                                clsx("w-full h-fit p-[20px] rounded-[10px] bg-white",
                                    'border-1 border-amber-600'
                                )}>
                                <p className="text-justify text-wrap max-w-full text-[18px]">
                                    {questions[0].content}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[20px] mt-[20px] ml-[30px]">
                                <div className="flex flex-row gap-[15px] text-[18px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]"
                                        type="radio" name="option" />
                                    <label className="font-semibold">A.</label>
                                    <p className="max-w-[700px] text-justify">{questions[0].a}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[18px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]"
                                        type="radio" name="option" />
                                    <label className="font-semibold">B.</label>
                                    <p className="max-w-[700px] text-justify">{questions[0].b}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[18px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]"
                                        type="radio" name="option" />
                                    <label className="font-semibold">C.</label>
                                    <p className="max-w-[700px] text-justify">{questions[0].c}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[18px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]"
                                        type="radio" name="option" />
                                    <label className="font-semibold">D.</label>
                                    <p className="max-w-[700px] text-justify">{questions[0].d}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row mt-[20px] gap-[15px]">
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--royal-blue) text-white gap-[15px]',
                                    'cursor-pointer hover:opacity-90 transition-opacity duration-150 ease-in'
                                )
                            }>
                                <FontAwesomeIcon icon={faAngleLeft} />
                                <label>Previous</label>
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--md-red) text-white gap-[15px] ml-auto',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer'
                                )
                            }>
                                <FontAwesomeIcon icon={faEraser} />
                                <label>Clear answer</label>
                            </div>
                            <div className={
                                clsx('flex items-center justify-center h-[40px] w-fit pl-[20px] pr-[20px]',
                                    'rounded-[8px] bg-(--dark-mint) text-white gap-[10px]',
                                    'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer'
                                )
                            }>
                                <label>Save and next</label>
                                <FontAwesomeIcon icon={faAngleRight} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[15px] flex-1">
                    <div className="flex flex-col gap-[10px] pt-[10px] pl-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[130px] bg-white">
                        <label className="font-medium text-(--md-red)">Time left:</label>
                        <label className="font-semibold text-[40px] mr-auto ml-auto">{'75 : 00'}</label>
                    </div>
                    <div className="flex flex-col gap-[5px] pt-[10px] pl-[15px] pr-[15px] border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[240px] bg-white">
                        <label className="font-medium">Overview</label>
                        <div className="h-[1px] w-full bg-[rgba(0,0,0,0.2)]"></div>
                        <div className="flex flex-col gap-[10px] mt-[15px] w-full">
                            <div className="flex justify-between w-full">
                                <label>Total questions:</label>
                                <label className="font-medium">10</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Visited:</label>
                                <label className="font-medium">5</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Not visited:</label>
                                <label className="font-medium">5</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Answered:</label>
                                <label className="font-medium">5</label>
                            </div>
                            <div className="flex justify-between w-full">
                                <label>Not answered:</label>
                                <label className="font-medium">5</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row gap-[5px] w-full">
                        <div className={
                            clsx('h-[40px] w-1/2 rounded-[8px] flex items-center justify-center',
                                'bg-(--dark-green) text-white hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer',
                            )}>
                                Submit
                        </div>
                        <div className={
                            clsx('h-[40px] w-1/2 rounded-[8px] flex items-center justify-center',
                                'hover:opacity-90 transition-opacity duration-150 ease-in cursor-pointer',
                                'border-2 border-(--md-orange) text-(--md-orange)'
                            )}>
                                Exit
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}