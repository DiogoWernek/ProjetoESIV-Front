import * as S from './styles'

type CardProps = React.ComponentProps<"div"> & {
    textHeader: string,
    number: number,
    subNumber?: string,
}

export function Card({ number, subNumber,textHeader, children, ...rest }: CardProps) {
    return (
        <S.Container>
            <div className='cardsContainer' {...rest}>
                <div className='numbers'>
                    <p>{textHeader}</p>
                    <div className='sub-numbers' style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                        <span>{number}</span>
                        {subNumber && <p>{subNumber}</p>}
                    </div>
                </div>
                <div className='icon'>
                    {children}
                </div>
            </div>
        </S.Container>
    )
}