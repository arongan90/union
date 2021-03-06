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

  @media screen and (max-width: 767px) {
    padding: 16px 10px 50px;
  }
`;
const UploadBox = styled.div`
  max-width: 500px;
  height: 578px;
  border-radius: 12px;
  margin: 0 auto;
  padding: 15px;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
  background: ${colors.whiteColor};
  
  @media screen and (max-width: 767px) {
    height: auto;
  }
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
  max-width: 500px;
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

const AddLinkPresentational = ({
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
            >????????? ????????????</ContentTitle>
            <UploadBox>
                <Title>?????? ????????????</Title>
                <SubTitle star>????????? ??????</SubTitle>
                <FileUpload
                    width={160}
                    height={120}
                    fileUpload={fileUpload}
                    handleFileUpload={handleFileUpload}
                />
                <SubTitle star>?????? ??????</SubTitle>
                <SelectBox
                    onChange={handleSelected}
                >
                    <option value="selected">????????????</option>
                    <option value="shopping">??????</option>
                    <option value="blog">?????????</option>
                    <option value="contents">?????????</option>
                    <option value="info">??????</option>
                    <option value="etc">??????</option>
                </SelectBox>
                <SubTitle star>????????????</SubTitle>
                <Inputs
                    name="linkTitle"
                    value={linkTitle}
                    onChange={handleInputChange}
                    placeholder="?????? ????????? ??????????????????."
                />
                <SubTitle star>????????????</SubTitle>
                <Inputs
                    name="linkUrl"
                    value={linkUrl}
                    onChange={handleInputChange}
                    placeholder="?????? url????????? ??????????????????."
                />
                <SubTitle star notMarginBottom>????????????</SubTitle>
                <RadioBox>
                    <RadioGroup onChange={handleRadioChange} value={isOpen} name="isOpen">
                        <FormControlLabel value={1} control={<Radio/>} label="??????(ON)"/>
                        <FormControlLabel value={0} control={<Radio/>} label="?????????(OFF)"/>
                    </RadioGroup>
                </RadioBox>
            </UploadBox>
            <ButtonBox>
                <Button
                    fontColor={colors.loginDefaultFont}
                    bgColor={colors.whiteColor}
                    border="2px solid #BBBBBB"
                    onClick={onCancel}
                >??? ???
                </Button>
                <Button
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                    border="none"
                    onClick={onRegister}
                >?????? ??????
                </Button>
            </ButtonBox>
        </Wrapper>
    );
}

export default AddLinkPresentational;