import styled from "styled-components";
import { Link } from "react-router-dom";
import { darken, lighten } from "polished";

export const Container = styled.div`
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  button {
    background: #fec903;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    margin-top: 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 180ms ease-in-out;

    @media (max-width: 520px) {
      margin-top: 20px;
      width: 100%;
      padding: 20px;
    }

    &:hover {
      background: ${darken(0.04, "#fec903")};
    }
  }
`;

export const ButtonBack = styled(Link)`
    margin-top: 20px;
    background: #4d4d4d;
    color: #fff;
    border: 0;
    border-radius: 4px;
    padding: 12px 20px;
    font-weight: bold;
    text-transform: uppercase;
    transition: background 180ms ease-in-out;
    text-decoration: none;
    display: inline-block;
    text-align: center;

    @media (max-width: 520px) {
      margin-top: 20px;
      width: 100%;
      padding: 20px;
    }

    &:hover {
      background: ${lighten(0.04, "#4d4d4d")};
    }

    &:active {
      background: ${darken(0.04, "#4d4d4d")};
    }
  }
`;

export const Title = styled.div`
  margin-bottom: 20px;
  font-weight: bold;
`;

export const ButtonFormContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 520px) {
    flex-direction: column;
  }
`;
