import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className: string;
};

const Button: FC<Props> = ({ children, className }) => {
  return (
    <>
      <button type="submit" className={className}>{children}</button>
    </>
  );
};

export default Button;
