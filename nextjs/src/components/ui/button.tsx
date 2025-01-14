import React, { forwardRef } from 'react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className = '', variant = 'default', size = 'default', ...props },
        ref
    ) => {
        const baseStyles =
            'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variantStyles = {
            default:
                'bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500',
            destructive:
                'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
            outline:
                'border border-teal-600 text-teal-600 hover:bg-teal-50 dark:hover:bg-teal-900 focus-visible:ring-teal-500',
            secondary:
                'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
            ghost: 'hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-100',
            link: 'text-teal-600 underline-offset-4 hover:underline focus-visible:ring-teal-500',
        };

        const sizeStyles = {
            default: 'h-10 px-4 py-2',
            sm: 'h-8 px-3 text-xs',
            lg: 'h-12 px-8',
            icon: 'h-10 w-10',
        };

        const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

        return <button className={classes} ref={ref} {...props} />;
    }
);
Button.displayName = 'Button';

export { Button };
