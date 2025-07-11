import clsx from "clsx"

export type CustomComboBoxProps = {
    dataList?: string[]
    width?: string
    height?: string
    hint?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

export const CustomComboBox = ({ dataList = [], width = '400px', height = '40px', hint,  onChange} : CustomComboBoxProps) => {
    return (
        <div className={
            clsx('flex items-center justify-center border-2 border-[rgba(0,0,0,0.2)]',
                'rounded-[8px] pl-[15px] pr-[15px]',
                'focus-within:border-(--md-mint)',
                'transition-colors duration-100 ease-in'
            )} style={{ width, height }}>
                <input onChange={onChange} list='options' placeholder={hint} className="h-full w-full border-none outline-none"/>
                <datalist id="options">
                    {dataList.map((val, idx) => (
                        <option key={idx} value={val} />
                    ))}
                    <option value={'Other'}/>
                </datalist>
        </div>
    )
}