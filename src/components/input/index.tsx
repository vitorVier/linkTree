import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export function Input(props: InputProps) {
    return (
        <input 
            className="border-0 h-9 rounded-md outline-none px-2 mb-2 bg-amber-50" 
            {...props}
        />
    )
}