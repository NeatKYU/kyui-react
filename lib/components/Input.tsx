import React from 'react'
import clsx from 'clsx'

const InputStyles =
    'bg-white border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all placeholder:text-gray-400'
const FileStyles =
    'bg-white border focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-all placeholder:text-gray-400 file:border-0 file:rounded-none file:px-3 file:py-2 file:mr-3'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type, className, ...rest } = props
    return (
        <input
            aria-label="file"
            ref={ref}
            type={type}
            className={clsx(type === 'file' ? FileStyles : InputStyles, className)}
            {...rest}
        />
    )
})

Input.displayName = 'Input'

export { Input }
