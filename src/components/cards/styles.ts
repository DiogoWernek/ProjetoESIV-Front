import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    max-width: 15.625rem;
    margin-top: 2rem;

    padding: 1rem;
    background-color: white;
    border-radius: 1rem;
    box-shadow: #00000029 4px 4px 14px 0px;

    .cardsContainer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .numbers {
            display: flex;
            flex-direction: column;
        }

        .icon {
            padding: 0.2rem;
            display: flex;
            align-items: center;
            background-color: #E8EEFA;
            border-radius: 50%;
        }
    }
`