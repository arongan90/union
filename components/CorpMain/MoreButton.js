import React from 'react';
import styled from "styled-components";
import plusIcon from "/public/images/share/plusIcon.svg";
import minusIcon from "/public/images/share/minusIcon.svg";

const ButtonBox = styled.div`
  text-align: center;
  cursor: pointer;
  color: #888888;
  font-size: 14px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 10px;
`;
const PlusIcon = styled.img`
  margin-left: 5px;
`;

const MoreButton = ({onToggle, moreView}) => {
    return (
        <ButtonBox onClick={onToggle}>
            더보기
            {moreView
                ? <PlusIcon src={minusIcon} />
                : <PlusIcon src={plusIcon} />
            }
        </ButtonBox>
    )
}

export default MoreButton;