import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import LongButton from "../components/LongButton";

const ModalWrapper = styled.div`
  width: 500px;
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
  border-bottom: 1px solid ${colors.inputBorder};

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
  border: 1px solid ${colors.loginTabBorder};
`;
const Inputs = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
`;
const ButtonGroup = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;


const AddVideoEmbedModal = ({subject, explain, videoUrl, handleCloseModal, modalInputOnChange, onVideoUpload}) => {
    return (
        <ModalWrapper>
            <Title>동영상 링크 추가</Title>
            <SubTitle>제목</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="subject"
                    value={subject}
                    onChange={modalInputOnChange}
                    placeholder="제목을 입력해주세요."
                />
            </InputBox>
            <SubTitle>설명 내용</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="explain"
                    value={explain}
                    onChange={modalInputOnChange}
                    placeholder="설명을 간단히 입력해주세요."
                />
            </InputBox>
            <SubTitle>동영상 링크 주소</SubTitle>
            <InputBox>
                <Inputs
                    type="text"
                    name="videoUrl"
                    value={videoUrl}
                    onChange={modalInputOnChange}
                    placeholder="동영상 url주소를 입력해주세요."
                />
            </InputBox>
            <ButtonGroup>
                <LongButton
                    width="48%"
                    display="inline-block"
                    fontColor={colors.gray}
                    fontSize={18}
                    bgColor={colors.whiteColor}
                    border={`1px solid ${colors.loginTabBorder}`}
                    onClick={handleCloseModal}
                >취 소
                </LongButton>
                <LongButton
                    width="48%"
                    display="inline-block"
                    fontColor={colors.whiteColor}
                    fontSize={18}
                    bgColor={colors.deepDarkBlue}
                    onClick={onVideoUpload}
                >업 로 드
                </LongButton>
            </ButtonGroup>
        </ModalWrapper>
    )
}

export default AddVideoEmbedModal;