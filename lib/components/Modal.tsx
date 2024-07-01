import React from 'react'
// import clsx from 'clsx'
import { twClsx } from '@/utils/index'
import { cva } from 'class-variance-authority'
import Close from '@/public/close.svg?react'

const OverlayClasses = cva('overlay w-full h-full bg-black/30 fixed top-0 left-0')
const ModalClasses = cva(
    'modal flex flex-col gap-2 raltive absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6',
    {
        variants: {
            size: {
                sm: 'w-80',
                md: 'w-[540px]',
                lg: 'w-[720px]',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
)

interface ChildrenProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
interface ModalProps extends ChildrenProps {
    isOpen: boolean
    changeOpen: (isOpen: boolean) => void
    size?: 'sm' | 'md' | 'lg'
}

const ModalComponent = React.forwardRef<HTMLDivElement, ModalProps>((props, ref) => {
    const { children, size, isOpen, changeOpen, className, ...rest } = props

    const handleClose = () => {
        changeOpen(false)
        console.log('close')
    }

    return (
        <div className={twClsx({ hidden: !isOpen }, OverlayClasses())} onClick={handleClose}>
            <div
                ref={ref}
                className={twClsx(ModalClasses({ className, size }))}
                onClick={(e) => e.stopPropagation()}
                {...rest}
            >
                <Close className="w-4 cursor-pointer absolute top-2 right-2" onClick={handleClose} />
                {children}
            </div>
        </div>
    )
})

const Header = (props: ChildrenProps) => {
    const { children, className, ...rest } = props
    return (
        <header className={twClsx('w-full text-2xl', className)} {...rest}>
            {children}
        </header>
    )
}

const Body = (props: ChildrenProps) => {
    const { children, className, ...rest } = props
    return (
        <main className={twClsx('w-full', className)} {...rest}>
            {children}
        </main>
    )
}

const Footer = (props: ChildrenProps) => {
    const { children, className, ...rest } = props
    return (
        <footer className={twClsx('w-full', className)} {...rest}>
            {children}
        </footer>
    )
}
const Modal = Object.assign(ModalComponent, { Header, Body, Footer })

export { Modal }
