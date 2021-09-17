import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import {BsFillQuestionCircleFill} from "react-icons/bs";

const ToolTipIcon = styled.span`
  font-size: 16px;
  color: ${colors.deepDarkGray};

  &:hover {
    cursor: help;
  }
`;
const ToolTipBox = styled.div`
  font-size: 12px;
  color: ${colors.lightBlack};
  border-radius: 5px;
  border: 1px solid ${colors.chatDefaultColor};
  word-break: keep-all;
  background: ${colors.deepWhite};
  padding: 10px;
  position: absolute;
  top: 3px;
  right: 75px;
  z-index: 1;
  visibility: hidden;
  box-shadow: 0 0 8px ${colors.gray};

  ${ToolTipIcon}:hover & {
    visibility: visible;
  }
`;

const ToolTip = ({ children }) => {
    return (
        <ToolTipIcon>
            <BsFillQuestionCircleFill/>
            <ToolTipBox>
                {children}
            </ToolTipBox>
        </ToolTipIcon>
    )
}

export default ToolTip;