import React from 'react';
import styled from "styled-components";
import plusSvg from "/public/images/share/plusIcon.svg";
import minusSvg from "/public/images/share/minusIcon.svg";
import colors from "../../styles/colors";

const ButtonBox = styled.div`
  cursor: pointer;
  color: ${colors.loginDefaultFont};
  font-size: 14px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 10px;
  display: flex;
`;
const PlusIcon = styled.img`
  margin-left: 5px;
`;

const MoreButton = ({onToggle, moreView}) => {
    return (
        <ButtonBox onClick={onToggle}>
            더보기
            {moreView
                ? <PlusIcon src={minusSvg} />
                : <PlusIcon src={plusSvg} />
            }
        </ButtonBox>
    )
}

export default MoreButton;