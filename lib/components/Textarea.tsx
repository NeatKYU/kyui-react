import React from 'react'
import clsx from 'clsx'

const TextareaStyles =
    'border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-700 transition-all px-3 py-1'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const { className, ...rest } = props
    return <textarea ref={ref} className={clsx(TextareaStyles, className)} {...rest} />
})

Textarea.displayName = 'Textarea'

export { Textarea }
