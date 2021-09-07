import React from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";

const ContentTitleBox = styled.div`
  max-width: 500px;
  color: ${colors.deepDarkBlue};
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
  position: relative;
  margin: 0 auto 8px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
  
  ${({ height }) => height && css`
    height: ${height};
  `}

  ${({ padding }) => padding && css`
    padding: ${padding};
  `}
  
  &:before {
    content: "";
    width: 4px;
    height: 24px;
    position: absolute;
    top: 5px;
    left: 0;
    ${({beforePosition}) => beforePosition && css`
      top: 26px;
      left: 15px;
    `}

    background: ${colors.orangeColor};
  }
`;

const ContentTitle = ({ children, height, padding, beforePosition }) => {
    return (
        <ContentTitleBox
            height={height}
            padding={padding}
            beforePosition={beforePosition}
        >
            {children}
        </ContentTitleBox>
    )
}

export default ContentTitle;