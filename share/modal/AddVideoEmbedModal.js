import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import LongButton from "../components/LongButton";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const ModalWrapper = styled.div`
  max-width: 500px;
  height: 530px;
  padding: 20px 15px;
  margin: 10% auto;
  background: ${colors.whiteColor};
`;
const Title = styled.div`
  height: 35px;
  color: ${colors.deepDarkBlue};
  font-size: 20px;
  font-weight: bold;
  position: relative;
  padding-left: 10px;
  margin: 15px 0 20px;
  border-bottom: 1px solid ${colors.footerText};

  &:after {
    content: "";
    width: 150px;
    height: 3px;
    background: ${colors.deepDarkBlue};
    opacity: 0.5;
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
const SubTitle = styled.div`
  color: ${colors.lightBlack};
  font-size: 18px;
  margin: 15px 0 10px;
`;
const InputBox = styled.div`
  width: 100%;
  height: 40px;
  padding: 0 10px;
  border-radius: 5px;
  border: 1px solid ${colors.ultraLightGray};
`;
const Inputs = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;
const RadioBox = styled(RadioGroup)`
  width: 55%;
  margin: 20px 10px 30px;

  @media screen and (max-width: 420px) {
    width: 80%;
  }

  @media screen and (max-width: 340px) {
    width: 90%;
  }
  
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
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AddVideoEmbedModal = ({
                                subject,
                                explain,
                                videoUrl,
                                handleCloseModal,
                                videoInputsChange,
                                onVideoUpload,
                                handleRadioChange,
                                isOpen,
                                editOrder,
                                editData
                            }) => {
    return (
        <ModalWrapper>
            <Title>????????? ?????? ??????</Title>
            <SubTitle>??????</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={videoInputsChange}
                    placeholder="????????? ??????????????????."
                />
            </InputBox>
            <SubTitle>?????? ??????</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="explain"
                    value={explain}
                    onChange={videoInputsChange}
                    placeholder="????????? ????????? ??????????????????."
                />
            </InputBox>
            <SubTitle>????????? ?????? ??????</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="videoUrl"
                    value={videoUrl}
                    onChange={videoInputsChange}
                    placeholder="????????? url????????? ??????????????????."
                />
            </InputBox>
            <RadioBox>
                <RadioGroup onChange={handleRadioChange} value={editOrder ? editData.secure : isOpen} name="isOpen">
                    <FormControlLabel value={1} control={<Radio/>} label="??????(ON)"/>
                    <FormControlLabel value={0} control={<Radio/>} label="?????????(OFF)"/>
                </RadioGroup>
            </RadioBox>
            <ButtonGroup>
                <LongButton
                    width="48%"
                    display="inline-block"
                    fontColor={colors.gray}
                    fontSize={18}
                    bgColor={colors.whiteColor}
                    border={`1px solid ${colors.footerText}`}
                    onClick={handleCloseModal}
                >??? ???
                </LongButton>
                <LongButton
                    width="48%"
                    display="inline-block"
                    fontColor={colors.whiteColor}
                    fontSize={18}
                    bgColor={colors.deepDarkBlue}
                    onClick={onVideoUpload}
                >??? ??? ???
                </LongButton>
            </ButtonGroup>
        </ModalWrapper>
    )
}

export default AddVideoEmbedModal;