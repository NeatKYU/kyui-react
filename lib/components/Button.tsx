import React from 'react';
import { cva } from 'class-variance-authority';
import { twClsx } from '@/utils/index';

const ButtonClasses = cva('border border-gray-200 hover:bg-gray-50', {
    variants: {
        size: {
            sm: 'h-8 min-w-12 px-2 py-1',
            md: 'h-10 min-w-16 px-4 py-2',
            lg: 'h-12 min-w-20 px-6 py-3',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { children, size, className, ...rest } = props;
    return (
        <button ref={ref} className={twClsx(ButtonClasses({ className, size }))} {...rest}>
            {children}
        </button>
    );
});
export { Button };
