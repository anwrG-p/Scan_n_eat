import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'link';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    isLoading,
    className = '',
    disabled,
    ...props
}) => {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800",
        outline: "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100",
        link: "bg-transparent text-blue-600 hover:text-blue-700 hover:underline p-0 h-auto shadow-none"
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin mr-2" />
            ) : null}
            {children}
        </button>
    );
};
