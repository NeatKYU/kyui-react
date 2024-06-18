import React from 'react'
import { cva } from 'class-variance-authority'
import { twClsx } from '@/utils/index'
import clsx from 'clsx'
import Down from '@/public/down.svg?react'

type SelectContextType = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectValue: string | number | undefined
    setSelectValue: React.Dispatch<React.SetStateAction<string | number | undefined>>
    onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void
}

const SelectClasses = cva(
    'bg-white border border-gray-200 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all',
    {
        variants: {
            size: {
                sm: 'h-8 w-32',
                md: 'h-10 w-40',
                lg: 'h-12 w-52',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
)

interface SelectProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    defaultValue?: string | number
    onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void
}

const SelectContext = React.createContext<SelectContextType | null>(null)

const SelectComponent = React.forwardRef<HTMLButtonElement, SelectProps>((props, ref) => {
    const { children, size, defaultValue, onChange, className, ...rest } = props
    const [isOpen, setIsOpen] = React.useState(false)
    const [selectValue, setSelectValue] = React.useState<string | number | undefined>(defaultValue ?? undefined)

    return (
        <SelectContext.Provider value={{ isOpen, setIsOpen, selectValue, setSelectValue, onChange }}>
            <button ref={ref} className={twClsx(SelectClasses({ className, size }))} {...rest}>
                {children}
            </button>
        </SelectContext.Provider>
    )
})

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    // children: React.ReactNode
    placeholder: string
}

const Trigger = (props: TriggerProps) => {
    const { placeholder, ...rest } = props
    const { setIsOpen, selectValue } = React.useContext(SelectContext) as SelectContextType

    const handleOpen = () => {
        setIsOpen((prev: boolean) => !prev)
    }

    return (
        <div className="flex items-center h-full box-border px-3 py-1 justify-between" onClick={handleOpen} {...rest}>
            <div className="trigger truncate">{selectValue ? selectValue : placeholder}</div>
            <Down className="w-3 flex-shrink-0" />
        </div>
    )
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    value: string | number
}

const ItemClasses = 'hover:bg-gray-200 cursor-pointer px-2 py-1 text-start'

const Item = (props: ItemProps) => {
    const { children, value, ...rest } = props
    const { setSelectValue, setIsOpen, onChange } = React.useContext(SelectContext) as SelectContextType

    const handleSelectValue = (event: React.MouseEvent<HTMLDivElement>) => {
        setSelectValue(value)
        setIsOpen(false)
        if (onChange) {
            const newEvent = {
                ...event,
                target: { ...event.target, value } as EventTarget & HTMLButtonElement,
            } as unknown as React.ChangeEvent<HTMLButtonElement>
            onChange(newEvent)
        }
    }
    return (
        <div className={clsx(ItemClasses)} onClick={handleSelectValue} {...rest}>
            {children}
        </div>
    )
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const ContentClasses = 'flex-col absolute bg-white border border-gray-200 left-0 top-full translate-y-1 p-1'

const Content = (props: ContentProps) => {
    const { children, ...rest } = props
    const { isOpen } = React.useContext(SelectContext) as SelectContextType
    return (
        <div className={clsx(ContentClasses, { hidden: !isOpen, flex: isOpen })} {...rest}>
            {children}
        </div>
    )
}

// SelectComponent.Trigger = Trigger
const Select = Object.assign(SelectComponent, { Trigger, Item, Content })

export { Select }
