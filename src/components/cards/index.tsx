import * as S from './styles'

type CardProps = React.ComponentProps<"div"> & {
    textHeader: string,
    number: number,
}

export function Card({ number, textHeader, children, ...rest}: CardProps) {
    return (
        <S.Container>
            <div className='cardsContainer' {...rest}>
                <div className='numbers'>
                    <p>{textHeader}</p>
                    <span>{number}</span>
                </div>
                <div className='icon'> 
                    {children}
                </div>
            </div>
        </S.Container>
    )
}