import React from 'react'
import clsx from 'clsx'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
    const { className, ...rest } = props
    return <textarea ref={ref} className={clsx('border', className)} {...rest} />
})

Textarea.displayName = 'Textarea'

export { Textarea }
