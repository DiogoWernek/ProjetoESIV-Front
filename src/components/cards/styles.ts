import styled from "styled-components";

export const Container = styled.div`
    width: 100%;

    padding: 1rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: #00000029 4px 4px 14px 0px;
    transition: transform 300ms ease;

    .cardsContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .numbers {
            gap: 0.4rem;
            display: flex;
            flex-direction: column;

            p {
                font-size: 0.8rem;
                color: #797981;
            }

            span {
                font-weight: 800;
            }

            .sub-numbers {
                p {
                    font-size: 0.7rem;
                }
            }
        }

        .icon {
            padding: 0.3rem;
            display: flex;
            align-items: center;
            background-color: #E8EEFA;
            border-radius: 50%;
        }
    }

    &:hover {
        transition: transform 300ms ease;
        transform: scale(1.03);
    }
`