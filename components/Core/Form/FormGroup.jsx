import React from "react";

const FormGroup = ({ onSubmit, children, className, method }) => {
  return (
    <form onSubmit={onSubmit} className={className} method={method}>
      {children}
    </form>
  );
};

const PRIMARY_INPUT =
  "appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mt-1 ";
const InputField = ({
  id,
  name,
  className,
  variant,
  placeholder,
  value,
  onChange,
  onFocus,
  onKeyDown,
  multiline,
  rows,
  ...rest
}) => {
  return (
    <>
      {!multiline ? (
        <input
          id={id}
          name={name}
          className={
            variant === "primary" ? PRIMARY_INPUT + className : className
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onKeyDown={onKeyDown}
          {...rest}
        />
      ) : (
        <textarea
          id={id}
          name={name}
          rows={+rows}
          className={
            variant === "primary" ? PRIMARY_INPUT + className : className
          }
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        ></textarea>
      )}
    </>
  );
};

const PRIMARY_LABEL = "block text-sm font-medium text-primary ";
const DARK_LABEL = "block text-sm font-medium text-gray-900 ";
const LIGHT_LABEL = "block text-sm font-medium text-white ";

const InputLabel = ({
  children,
  className = "",
  variant,
  jsxFor = "",
  required,
  ...rest
}) => {
  return (
    <>
      <label
        htmlFor={jsxFor}
        className={
          variant === "primary"
            ? !required
              ? PRIMARY_LABEL + className
              : `${PRIMARY_LABEL}${className} required`
            : variant === "light"
            ? !required
              ? LIGHT_LABEL + className
              : `${LIGHT_LABEL}${className} required`
            : !required
            ? DARK_LABEL + className
            : `${DARK_LABEL}${className} required`
        }
        {...rest}
      >
        {children}
      </label>
    </>
  );
};

const Select = ({ children, className, id, ...rest }) => {
  return (
    <select
      className={
        `mt-1 block w-full py-2 px-3 text-gray-900 border border-gray-100 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mt-2 ${className}`
      }
      id={id}
      {...rest}
    >
      {children}
    </select>
  );
};

Select.Item = ({ children, className = "", value, ...rest }) => {
  return (
    <option className={className} value={value} {...rest}>
      {children}
    </option>
  );
};

export { FormGroup, InputField, InputLabel, Select };
