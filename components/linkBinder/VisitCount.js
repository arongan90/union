import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";

const CountWrapper = styled.div`
  width: 100%;
  height: 48px;
  font-size: 14px;
  font-weight: 500;
  color: ${colors.deepDarkBlue};
  background: ${colors.lightSkyBlue};  
  box-shadow: 0 1px 5px ${colors.grayShadowColor};
`;
const CountBox = styled.div`
  max-width: 530px;
  margin: 0 auto;
  height: 100%;
  line-height: 3.3;
`;
const Text = styled.span`
  font-size: 15px;
  font-weight: 600;
  margin-right: 20px;
`;
const SubText = styled.span`
    margin-right: 6px;
`;
const ActiveText = styled.span`
  color: ${colors.orangeYellow};
  &.firstChild {
    margin-right: 12px;
  }
`;

const VisitCount = () => {
    return (
        <CountWrapper>
            <CountBox>
                <Text>방문자</Text>
                <SubText>전체</SubText>
                <ActiveText className="firstChild">253</ActiveText>
                <SubText>오늘</SubText>
                <ActiveText>25</ActiveText>
            </CountBox>
        </CountWrapper>
    )
}

export default VisitCount;