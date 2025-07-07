import { faPaperclip } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useRef, useState } from "react"

export type CustomFileInputProps = {
    width?: string
    height?: string
    hint?: string
    passFileName?: (val: string) => void
}

export const CustomFileInput = ({ width = '400px', height = '40px', hint, passFileName }: CustomFileInputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)

    const [fileName, setFileName] = useState('')

    const browseFile = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFileName(file.name); 
        } else {
            setFileName("");
        }
        passFileName?.(fileName);
    };

    return (
        <div className="flex flex-row gap-[5px] items-center" style={{ width }}>
            <div className={
                clsx('flex items-center justify-center border-2 border-[rgba(0,0,0,0.2)]',
                    'rounded-[8px] pl-[15px] pr-[15px] w-9/10',
                    'focus-within:border-(--md-mint)',
                    'transition-colors duration-100 ease-in'
                )} style={{ height }}>
                <input value={fileName} type="text" placeholder={hint} className="h-full w-full border-none outline-none" />
                <input onChange={handleFileChange} ref={fileInputRef} type="file" hidden />
            </div>
            <div className={
                clsx("h-[40px] flex-1 bg-gray-300 text-gray-700 rounded-[8px]",
                    'flex items-center justify-center cursor-pointer',
                    'hover:opacity-90 duration-100 ease-in'
                )} onClick={browseFile}>
                <FontAwesomeIcon icon={faPaperclip} />
            </div>
        </div>
    )
}