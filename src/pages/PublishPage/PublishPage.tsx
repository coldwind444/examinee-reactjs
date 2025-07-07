import clsx from "clsx"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"
import { CustomTextBox } from "../../components/CustomTextBox/CustomTextBox"
import { CustomComboBox } from "../../components/CustomComboBox/CustomComboBox"
import { CustomFileInput } from "../../components/CustomFileInput/CustomFileInput"

export const PublishPage = () => {
    const options = ['Math', 'Physics', 'Biology', 'Chemistry', 'Other']
    const q =
    {
        order: 1,
        content: 'Xác định thành ngữ trong đoạn văn sau: "Lí Thông lân la gợi chuyện, rồi gạ cùng Thạch Sanh kết nghĩa anh em. Sớm mồ côi cha mẹ, tứ cố vô thân, nay có người săn sóc đến mình, Thạch Sanh cảm động, vui vẻ nhận lời"',
        a: ' Kết nghĩa anh em.',
        b: ' Mồ côi cha mẹ.',
        c: ' Tứ cố vô thân.',
        d: ' Đoạn văn trên không có thành ngữ.'
    }

    return (
        <div className={clsx('flex flex-col gap-[20px] pl-[40px]')}>
            <div className={clsx('flex flex-row mt-[20px] items-center gap-[10px]')}>
                <FontAwesomeIcon icon={faAngleLeft} />
                <label className={clsx('text-[20px] font-semibold')}>Publish new exam</label>
            </div>
            <div className={clsx('flex flex-row gap-[60px]')}>
                <form className={clsx('flex flex-col gap-[15px]')}>
                    <div className="flex flex-col gap-[5px]">
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Exam title</label>
                        <CustomTextBox height="40px" width="100%" type="text" hint="Enter exam title" />
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Subject</label>
                        <div className="flex flex-row gap-[10px] w-full">
                            <CustomComboBox hint="Select a subject" height="40px" width="50%" dataList={options} />
                            <CustomTextBox hint="Enter your option" height="40px" width="50%" />
                        </div>
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Scale</label>
                        <CustomTextBox type="number" hint="Maximum score of your exam, (ex: 100)"
                            height="40px" width="100%" />

                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Number of choices for 1 question</label>
                        <CustomTextBox type="number" hint="Ex: 4 for A, B, C, D" height="40px" width="100%" />
                    </div>
                    <div className='flex flex-col gap-[5px]'>
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Duration</label>
                        <div className="flex flex-row gap-[10px] items-center">
                            <CustomTextBox type="number" hint="Time limit for your exam (ex: 120)" height="40px" width="300px" />
                            <label className="font-medium text-[rgba(0,0,0,0.5)]">minutes</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[5px]">
                        <label className="font-medium ml-[5px] text-[rgba(0,0,0,0.5)]">Exam file</label>
                        <CustomFileInput height="40px" width="100%" hint="Select an .xlsx file" />
                    </div>
                    <div className="flex flex-row mt-[15px] w-full justify-between">
                        <button className={
                            clsx("h-[40px] w-[200px] border-2 border-(--md-red) rounded-[8px]",
                                'hover:opacity-90 duration-100 ease-in cursor-pointer'
                            )}>
                            <label className="text-(--md-red)">Clear all</label>
                        </button>
                        <button type="submit"
                            className={
                                clsx("h-[40px] w-[200px] bg-(--dark-green) rounded-[8px]",
                                    'hover:opacity-90 duration-100 ease-in cursor-pointer'
                                )}>
                            <label className="text-white">Publish</label>
                        </button>
                    </div>
                </form>
                <div className="flex flex-col border-1 border-[rgba(0,0,0,0.2)] rounded-[10px] h-[560px] w-[700px]">
                    <div className="h-[40px] w-full rounded-tl-[10px] rounded-tr-[10px] bg-(--dark-mint) flex flex-row justify-between items-center pl-[15px] pr-[15px] text-white">
                        <label>Preview</label>
                        <div className="flex flex-row gap-[15px]">
                            <FontAwesomeIcon className="cursor-pointer" icon={faAngleLeft} />
                            <FontAwesomeIcon className="cursor-pointer" icon={faAngleRight} />
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col p-[30px] overflow-y-auto custom-scrollbar">
                        <label className="text-[16px] ml-[10px] font-medium text-(--dark-mint)">{`Question ${q.order}:`}</label>
                        <div className="flex flex-col gap-[20px] pr-[15px] mt-[20px]">
                            <div className={
                                clsx("w-full h-fit p-[20px] rounded-[10px] bg-white",
                                    'border-1 border-amber-600'
                                )}>
                                <p className="text-justify text-wrap max-w-full text-[16px]">
                                    {q.content}
                                </p>
                            </div>
                            <div className="flex flex-col gap-[20px] mt-[20px] ml-[30px]">
                                <div className="flex flex-row gap-[15px] text-[16px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]" disabled
                                        type="radio" name="option" />
                                    <label className="font-semibold">A.</label>
                                    <p className="max-w-[700px] text-justify">{q.a}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[16px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]" disabled
                                        type="radio" name="option" />
                                    <label className="font-semibold">B.</label>
                                    <p className="max-w-[700px] text-justify">{q.b}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[16px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]" disabled
                                        type="radio" name="option" />
                                    <label className="font-semibold">C.</label>
                                    <p className="max-w-[700px] text-justify">{q.c}</p>
                                </div>
                                <div className="flex flex-row gap-[15px] text-[16px] items-center">
                                    <input className="cursor-pointer h-[20px] w-[20px]" disabled
                                        type="radio" name="option" />
                                    <label className="font-semibold">D.</label>
                                    <p className="max-w-[700px] text-justify">{q.d}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}