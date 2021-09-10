import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FileUpload from "../../share/fileUpload/FileUpload";
import selectArrowImage from "/public/images/share/selectArrow.svg";
import {darken, lighten} from "polished";
import ContentTitle from "../../share/components/ContentTitle";

const Wrapper = styled.div`
  width: 100%;
  padding: 16px 0 50px;
  background: ${colors.tabMenu};
`;
const UploadBox = styled.div`
  width: 500px;
  height: 578px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
`;
const Title = styled.div`
  font-size: 18px;
  color: ${colors.deepDarkBlue};
  position: relative;

  &:after {
    content: "";
    width: 103px;
    height: 5px;
    bottom: 5px;
    left: -2px;
    background: ${colors.orangeColor};
    opacity: 0.2;
    position: absolute;
  }
`;
const SubTitle = styled.div`
  color: ${colors.deepDarkGray};
  position: relative;
  font-size: 15px;
  display: inline-block;
  margin: 20px 0 8px;
  ${({star}) => star && css`
    &:after {
      content: "*";
      position: absolute;
      top: -2px;
      right: -8px;
      color: ${colors.activeRed};
    }
  `}
  ${({notMarginBottom}) => notMarginBottom && css`
    margin-bottom: 0;
  `}
`;
const SelectBox = styled.select`
  width: 170px;
  height: 40px;
  display: block;
  position: relative;
  background: ${colors.tabMenu};
  border-radius: 5px;
  border: 1px solid ${colors.inputBorder};
  outline: none;
  color: ${colors.lightGray};
  padding: 10px;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  background: url(${selectArrowImage}) no-repeat 95% 50% ${colors.borderLightGray};
`;
const Inputs = styled.input`
  width: 100%;
  height: 40px;
  display: block;
  background: ${colors.whiteColor};
  border: 1px solid ${colors.inputBorder};
  border-radius: 5px;
  padding: 10px;
  outline: none;

  &::placeholder {
    color: ${colors.lightGray};
  }
`;
const RadioBox = styled(RadioGroup)`
  width: 55%;
  margin-left: 30px;

  .MuiRadio-root {
    color: ${colors.inputBorder};
  }

  .MuiFormGroup-root {
    flex-direction: row;
    justify-content: space-between;
  }

  .MuiRadio-colorSecondary.Mui-checked {
    color: ${colors.deepDarkBlue};
  }

  .MuiTypography-body1 {
    font-size: 14px;
  }
`;
const ButtonBox = styled.div`
  width: 500px;
  text-align: center;
  margin: 50px auto;
`;
const Button = styled.button`
  width: 135px;
  height: 50px;
  color: ${({fontColor}) => fontColor};
  border: ${({border}) => border};
  border-radius: 7px;
  font-size: 14px;

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
    margin-left: 10px;
  }

`;

const AddLinkPresentation = ({
                                 handleSelected,
                                 handleRadioChange,
                                 isOpen,
                                 linkTitle,
                                 linkUrl,
                                 handleInputChange,
                                 onCancel,
                                 onRegister,
                                 fileUpload,
                                 handleFileUpload,
                             }) => {
    return (
        <Wrapper>
            <ContentTitle
                height="80px"
                padding="20px 30px"
                beforePosition
            >포스트 추가하기</ContentTitle>
            <UploadBox>
                <Title>링크 등록하기</Title>
                <SubTitle star>이미지 등록</SubTitle>
                <FileUpload
                    width={160}
                    height={120}
                    fileUpload={fileUpload}
                    handleFileUpload={handleFileUpload}
                />
                <SubTitle star>링크 종류</SubTitle>
                <SelectBox
                    onChange={handleSelected}
                >
                    <option value="selected">선택하기</option>
                    <option value="shopping">쇼핑</option>
                    <option value="blog">블로그</option>
                    <option value="contents">컨텐츠</option>
                    <option value="info">정보</option>
                    <option value="etc">기타</option>
                </SelectBox>
                <SubTitle star>링크제목</SubTitle>
                <Inputs
                    name="linkTitle"
                    value={linkTitle}
                    onChange={handleInputChange}
                    placeholder="링크 제목을 입력해주세요."
                />
                <SubTitle star>링크주소</SubTitle>
                <Inputs
                    name="linkUrl"
                    value={linkUrl}
                    onChange={handleInputChange}
                    placeholder="링크 url주소를 입력해주세요."
                />
                <SubTitle star notMarginBottom>링크공개</SubTitle>
                <RadioBox>
                    <RadioGroup onChange={handleRadioChange} value={isOpen} name="isOpen">
                        <FormControlLabel value={1} control={<Radio/>} label="공개(ON)"/>
                        <FormControlLabel value={0} control={<Radio/>} label="비공개(OFF)"/>
                    </RadioGroup>
                </RadioBox>
            </UploadBox>
            <ButtonBox>
                <Button
                    fontColor={colors.loginDefaultFont}
                    bgColor={colors.whiteColor}
                    border="2px solid #BBBBBB"
                    onClick={onCancel}
                >취 소
                </Button>
                <Button
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                    border="none"
                    onClick={onRegister}
                >링크 등록
                </Button>
            </ButtonBox>
        </Wrapper>
    );
}

export default AddLinkPresentation;