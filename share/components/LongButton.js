import React from 'react';
import styled, {css} from "styled-components";
import {darken, lighten} from "polished";
import colors from "../../styles/colors";

const Button = styled.button`
  border-radius: 7px;
  display: ${({display}) => display ? display : 'block'};
  width: ${({width}) => width ? width : '100%'};
  height: ${({height}) => height ? height : 50}px;
  color: ${({fontColor}) => fontColor};
  font-size: ${({fontSize}) => fontSize ? fontSize : 16}px;
  font-weight: ${({fontWeight}) => fontWeight ? fontWeight : 500};
  border: ${({border}) => border ? border : 'none'};

  ${({marginTop}) => marginTop && css`
    margin-top: ${marginTop}px;
  `}

  ${({marginBottom}) => marginBottom && css`
    margin-bottom: ${marginBottom}px;
  `}

  ${({costumeBgColor}) => costumeBgColor && css`
    background: ${costumeBgColor};
  `}

  ${({bgColor}) => bgColor && css`
    background: ${bgColor};

    &:hover {
      background: ${lighten(0.1, bgColor)};
    }

    &:active {
      background: ${darken(0.1, bgColor)};
    }
  `};
  
  & + & {
    margin-top: 10px;
  }
`;

const LongButton = ({
                        width,
                        height,
                        display,
                        fontColor,
                        fontSize,
                        bgColor,
                        children,
                        border,
                        fontWeight,
                        onClick,
                        costumeBgColor,
                        marginBottom,
                        marginTop
                    }) => {
    return (
        <Button
            width={width}
            height={height}
            display={display}
            fontColor={fontColor}
            fontSize={fontSize}
            bgColor={bgColor}
            border={border}
            fontWeigh={fontWeight}
            onClick={onClick}
            costumeBgColor={costumeBgColor}
            marginBottom={marginBottom}
            marginTop={marginTop}
        >
            {children}
        </Button>
    )
}

export default LongButton;