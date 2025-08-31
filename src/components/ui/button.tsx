import { type ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ children, ...rest }: Props) => {
  return (
    <button className="bg-white" {...rest}>
      {children}
    </button>
  );
};

export default Button;
