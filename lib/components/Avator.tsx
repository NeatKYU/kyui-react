import React from 'react'
import { cva } from 'class-variance-authority'
import { twClsx } from '@/utils/index'

const AvatorClasses = cva('bg-gray-200 flex rounded-full overflow-hidden', {
    variants: {
        size: {
            sm: 'h-10 w-10',
            md: 'h-12 w-12',
            lg: 'h-14 w-14',
        },
    },
    defaultVariants: {
        size: 'md',
    },
})

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
    // children: React.ReactNode
    size?: 'sm' | 'md' | 'lg'
    src?: string
    alt?: string
}

const Avator = React.forwardRef<HTMLDivElement, DivProps>((props, ref) => {
    const { size, src, alt, className, ...rest } = props
    return (
        <div ref={ref} className={twClsx(AvatorClasses({ className, size }))} {...rest}>
            {/* {children} */}
            <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
    )
})
export { Avator }
