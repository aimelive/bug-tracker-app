import { useState } from "react";
import { cfl } from "../../helpers/shared";

export const enum FieldType {
  email,
  password,
  username,
}
const inputIds = new Map([
  [FieldType.email, "email"],
  [FieldType.password, "password"],
  [FieldType.username, "username"],
]);
interface InputField {
  type: FieldType;
  onChange(value: string): void;
  onValidate(value: string): string;
}

const TextInput = (props: InputField) => {
  let placeholder: string;
  let maxLength: number;

  switch (props.type) {
    case FieldType.email:
      placeholder = "Email address";
      maxLength = 50;
      break;
    case FieldType.password:
      placeholder = "Enter password";
      maxLength = 12;
      break;
    case FieldType.username:
      placeholder = "Enter username";
      maxLength = 15;
      break;
    default:
      placeholder = "Enter text";
      maxLength = 20;
      break;
  }

  const [showPwd, setShowPwd] = useState(false);
  const [validation, setValidation] = useState("");

  return (
    <div className="relative my-1">
      <div>
        <input
          type={
            props.type === FieldType.password && showPwd
              ? "text"
              : inputIds.get(props.type)
          }
          className="form-control tracking-wider block w-full px-4 py-2 text-sm text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder:italic"
          id={inputIds.get(props.type)}
          name={inputIds.get(props.type)}
          placeholder={placeholder}
          minLength={5}
          maxLength={maxLength}
          onChange={(e) => {
            setValidation(props.onValidate(e.target.value.trim()));
            props.onChange(e.target.value.trim());
          }}
        />
        {validation ? (
          <span className="text-primary text-xs">{cfl(validation)}</span>
        ) : (
          <span className="text-transparent text-xs">validated no error</span>
        )}
      </div>
      {props.type === FieldType.password && (
        <span
          className="absolute text-blue-900 top-2 right-1.5 cursor-pointer hover:text-blue-600"
          onClick={() => setShowPwd(!showPwd)}
        >
          {!showPwd ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </span>
      )}
    </div>
  );
};

export default TextInput;
