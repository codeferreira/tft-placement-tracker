import styled, { css } from 'styled-components'

interface GamePositionProps {
  position?: 'first' | 'second' | 'third'
}

export const Container = styled.main`
  width: 400px;
  height: 200px;

  background: ${({ theme }) => theme.colors.background};

  padding: 8px;
  border-radius: 10px;

  hr {
    opacity: 0.4;
    margin: 0 17px;
    border-radius: 10px;
  }
`
export const TrackerHeader = styled.div`
  display: flex;
  align-items: center;

  margin-bottom: 6px;

  img {
    width: 95px;
    height: 95px;

    margin-right: 8px;
  }

  section {
    h1 {
      font-weight: bold;
      font-size: 36px;
      line-height: 45px;
      color: ${({ theme }) => theme.colors.primary};
      text-transform: lowercase;

      &::first-letter {
        text-transform: uppercase;
      }

      span {
        text-transform: uppercase;
      }
    }

    p {
      font-weight: 500;
      font-size: 28px;

      color: ${({ theme }) => theme.colors.text};

      span {
        font-weight: 500;
        font-size: 22px;
        line-height: 33px;
        color: ${({ theme }) => theme.colors.highlight};
      }
    }
  }
`

export const TrackerBody = styled.section`
  margin-top: 6px;

  h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: ${({ theme }) => theme.colors.secondaryText};
  }
`

export const LastGames = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 6px;
`

const positions = {
  first: css`
    background: rgba(250, 209, 105, 0.6);
  `,
  second: css`
    background: rgba(179, 179, 179, 0.6);
  `,
  third: css`
    background: rgba(154, 123, 95, 0.6);
  `
}

export const GamePosition = styled.div<GamePositionProps>`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 4px;
    padding: 4px 12px;
    width: 40px;
    height: 40px;

    background: rgba(151, 162, 199, 0.4);

    ${({ position }) => position && positions[position]};

    p {
      font-weight: bold;
      font-size: 24px;
      color: ${({ theme }) => theme.colors.primary};

      padding: 0;
      margin: 0;
    }
  }

  section {
    margin: 0 4px;

    width: 8px;
    height: 1px;

    background: ${({ theme }) => theme.colors.secondary};
  }
`
