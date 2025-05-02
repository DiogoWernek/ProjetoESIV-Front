import * as S from "./styles";

type ButtonProps = React.ComponentProps<"button"> & {
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  textColor?: string;
  border?: string;
  rounded?: boolean;
  fs?: string;
}

export function Button({ children, isLoading, type = "button", color, textColor, border, rounded, fs, ...rest }: ButtonProps) {
  return (
    <S.Button type={type} disabled={isLoading} color={color} textColor={textColor} border={border} rounded={rounded} fs={fs} {...rest}>
      {children}
    </S.Button>
  );
}