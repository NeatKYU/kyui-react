import React from 'react'
import clsx from 'clsx'

const InputStyles = 'bg-white border px-2 py-1 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type, className, ...rest } = props
    return <input ref={ref} type={type} className={clsx(InputStyles, className)} {...rest} />
})

Input.displayName = 'Input'

export { Input }
