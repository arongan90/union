import React from 'react';
import styled, { css } from "styled-components";
import {darken, lighten} from "polished";
import colors from "../../styles/colors";

const Button = styled.button`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
  border-radius: 5px;
  display: inline-block;
  color: ${({fontColor}) => fontColor};
  border: ${({border}) => border ? border : 'none'};
  font-weight: bold;

  ${({bgColor}) => bgColor && css`
    background: ${bgColor};

    &:hover {
      background: ${lighten(0.1, bgColor)};
    }

    &:active {
      background: ${darken(0.1, bgColor)};
    }
  `};
  
  ${(props) => props.editOrder && css`
    border: 1px solid ${props.bgColor};
    color: ${props.fontColor};
    &:hover {
      background: ${lighten(0.1, props.bgColor)};
    }
    &:active {
      background: ${darken(0.1, props.bgColor)};
    }
  `}

  & + & {
    margin-left: 10px;
  }
`;

const OrderButton = ({ children, width, height, bgColor, fontColor, border, editOrder, onClick }) => {
    return (
        <Button
            width={width}
            height={height}
            bgColor={bgColor}
            fontColor={fontColor}
            border={border}
            onClick={onClick}
            editOrder={editOrder}
        >
            {children}
        </Button>
    )
}

export default OrderButton;