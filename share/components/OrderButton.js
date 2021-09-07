import React from 'react';
import styled, { css } from "styled-components";
import {darken, lighten} from "polished";
import colors from "../../styles/colors";

const Button = styled.button`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  border: none;
  outline: none;
  border-radius: 5px;
  display: inline-block;
  color: ${({fontColor}) => fontColor};

  ${({bgColor}) => bgColor && css`
    background: ${bgColor};

    &:hover {
      background: ${lighten(0.1, bgColor)};
    }

    &:active {
      background: ${darken(0.1, bgColor)};
    }
  `};
  
  ${({ editOrder }) => editOrder && css`
    border: 1px solid ${({bgColor}) => bgColor};
    color: ${({bgColor}) => bgColor};
    font-weight: bold;
    background: ${colors.whiteColor};
    &:hover {
      background: ${lighten(0.1, colors.whiteColor)};
    }
    &:active {
      background: ${darken(0.1, colors.whiteColor)};
    }
  `}
`;

const OrderButton = ({ children, width, height, bgColor, fontColor, editOrder, handleEditOrder }) => {
    return (
        <Button
            width={width}
            height={height}
            bgColor={bgColor}
            fontColor={fontColor}
            onClick={handleEditOrder}
            editOrder={editOrder}
        >
            {children}
        </Button>
    )
}

export default OrderButton;