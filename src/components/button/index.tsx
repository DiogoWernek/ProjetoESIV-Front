import * as S from "./styles";

type ButtonProps = React.ComponentProps<"button"> & {
  disabled?: boolean;
  isLoading?: boolean;
  color?: string;
  textColor?: string;
}

export function Button({ children, isLoading, type = "button", color, textColor, ...rest }: ButtonProps) {
  return (
    <S.Button type={type} disabled={isLoading} color={color} textColor={textColor} {...rest}>
      {children}
    </S.Button>
  );
}