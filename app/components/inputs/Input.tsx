"use client";

import clsx from "clsx";
import { FieldError, FieldErrors } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  validation?: Object;
  register: any;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  register,
  required,
  errors,
  type = "text",
  disabled,
  validation,
}) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        "
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          disabled={disabled}
          {...register(id, { required, ...validation })}
          className={clsx(
            `
            form-input
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
            errors[id]?.message && "ring-[#D0000E]",
            disabled && "opacity-50 cursor-default"
          )}
        />
        {errors[id]?.message && (
          <span className="text-[#D0000E] text-sm mt-1 block">
            {(errors[id] as FieldError)?.message}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
