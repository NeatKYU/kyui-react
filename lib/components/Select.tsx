import React from 'react'
import { cva } from 'class-variance-authority'
import { twClsx } from '@/utils/index'
import Down from '@/public/down.svg?react'

/**
 * Select component
 * <Select>
 *  <Trigger/>
 *  <Content>
 *      <Item/>
 *  </Content>
 * </Select>
 *
 */

type SelectContextType = {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectValue: string | number | undefined
    setSelectValue: React.Dispatch<React.SetStateAction<string | number | undefined>>
    onChange?: (event: React.ChangeEvent<HTMLButtonElement>) => void
}

const SelectClasses = cva(
    'bg-white border border-gray-200 relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-700 transition-all',
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
            <button
                ref={ref}
                className={twClsx(SelectClasses({ className, size }))}
                onBlur={() => setIsOpen(false)}
                {...rest}
            >
                {children}
            </button>
        </SelectContext.Provider>
    )
})

interface TriggerProps extends React.HTMLAttributes<HTMLDivElement> {
    placeholder: string
}

const TriggerClasses = cva('flex items-center h-full box-border px-3 py-1 justify-between')

const Trigger = (props: TriggerProps) => {
    const { placeholder, className, ...rest } = props
    const { setIsOpen, selectValue } = React.useContext(SelectContext) as SelectContextType

    const handleOpen = () => {
        setIsOpen((prev: boolean) => !prev)
    }

    return (
        <div className={twClsx(TriggerClasses({ className }))} onClick={handleOpen} {...rest}>
            <div className="trigger truncate">{selectValue ? selectValue : placeholder}</div>
            <Down className="w-3 flex-shrink-0" />
        </div>
    )
}

interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const ContentClasses = cva(
    'flex-col absolute bg-white border border-gray-200 left-0 top-full translate-y-1.5 -translate-x-[1px] p-1 taransition-all overflow-hidden z-10'
)

const Content = (props: ContentProps) => {
    const { children, className, ...rest } = props
    const { isOpen } = React.useContext(SelectContext) as SelectContextType
    return (
        <div className={twClsx({ hidden: !isOpen, flex: isOpen }, ContentClasses({ className }))} {...rest}>
            {children}
        </div>
    )
}

interface ItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
    value: string | number
}

const ItemClasses = cva('hover:bg-gray-200 cursor-pointer px-2 py-1 text-start truncate')

const Item = (props: ItemProps) => {
    const { children, className, value, ...rest } = props
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
        <div className={twClsx(ItemClasses({ className }))} onClick={handleSelectValue} {...rest}>
            {children}
        </div>
    )
}

const Select = Object.assign(SelectComponent, { Trigger, Item, Content })

export { Select }
