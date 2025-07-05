import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import clsx from "clsx"
import { useState } from "react"

export type CustomTextBoxProps = {
    type?: string
    hint?: string
    width?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CustomTextBox = ({ type = 'text', hint, width = '400px', onChange }: CustomTextBoxProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className={
            clsx('flex items-center justify-center border-2 border-[rgba(0,0,0,0.2)]',
                'rounded-[8px] h-[50px] pl-[15px] pr-[15px]',
                'focus-within:border-(--md-mint)',
                'transition-colors duration-150 ease-in'
            )} style={{ width }}>
            {type === 'password' ?
                (<input required className={clsx('h-[40px] w-full border-none outline-none')}
                    onChange={onChange} type={showPassword ? 'text' : 'password'} placeholder={hint} />) :
                (<input required className={clsx('h-[40px] w-full border-none outline-none')}
                    onChange={onChange} type={type} placeholder={hint} />)
            }
            {type === 'password' && (
                <div className={clsx('text-[rgba(0,0,0,0.5)] cursor-pointer')} onClick={() => setShowPassword(prev => !prev)}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </div>
            )}
        </div>
    )
}