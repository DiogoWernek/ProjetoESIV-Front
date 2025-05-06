import { MagnifyingGlass } from "@phosphor-icons/react";
import * as S from "./styles";

type SearchProps = React.ComponentProps<"input">

export function Search({ ...rest }: SearchProps) {
  return (
    <S.Container>
      <div className="input">
        <MagnifyingGlass size={16} color="#9B9BA1" />
        <input type="text" {...rest} />
      </div>
    </S.Container>
  );
}
