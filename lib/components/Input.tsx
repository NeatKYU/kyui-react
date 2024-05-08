import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { type, className, ...rest } = props;
    return <input ref={ref} type={type} className={clsx('border', className)} {...rest} />;
});

Input.displayName = 'Input';

export { Input };
