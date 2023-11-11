import classNames from "classnames";

type Props = JSX.IntrinsicElements["input"] & {
  label: string;
  hasError?: boolean;
  errorMessage?: string;
};

const TextInput: React.FC<Props> = ({
  label,
  hasError,
  errorMessage,
  ...rest
}) => {
  return (
    <div>
      <p
        className={classNames("font-sans text-sm", {
          "text-slate-900": !hasError,
          "text-red-500": hasError,
        })}
      >
        {label}
      </p>
      <input
        className={classNames(
          "mt-3 h-10 border  w-full rounded-md px-4 font-sans text-sm text-slate-900 placeholder-slate-400",
          {
            "border-slate-200": !hasError,
            "border-red-500": hasError,
          }
        )}
        {...rest}
      />
      {hasError && (
        <p className="font-sans text-red-500 text-xs mt-3">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextInput;
