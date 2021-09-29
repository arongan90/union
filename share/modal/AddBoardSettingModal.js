import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";
import LongButton from "../components/LongButton";

const ModalWrapper = styled.div`
  max-width: 500px;
  height: 630px;
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
  margin: 15px 0 30px;
  border-bottom: 1px solid ${colors.footerText};
  
  &:after {
    content: "";
    width: 115px;
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
const TextArea = styled.textarea`
  width: 100%;
  height: 260px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${colors.ultraLightGray};
  resize: none;
  outline: none;
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AddBoardSettingModal = ({
                                subject,
                                handleAddBoardClose,
                                modalInputOnChange,
                                onVideoUpload,
                                isOpen,
                                editOrder,
                                editData
                            }) => {
    return (
        <ModalWrapper>
            <Title>게시물 등록</Title>
            <InputBox>
                <Inputs
                    type="text"
                    name="subject"
                    value={editOrder ? editData.title : subject}
                    onChange={modalInputOnChange}
                    placeholder="제목을 입력해주세요."
                />
            </InputBox>

            <TextArea placeholder="내용을 입력해주세요.">

            </TextArea>


            <ButtonGroup>
                <LongButton
                    width="48%"
                    display="inline-block"
                    fontColor={colors.gray}
                    fontSize={18}
                    bgColor={colors.whiteColor}
                    border={`1px solid ${colors.footerText}`}
                    onClick={handleAddBoardClose}
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

export default AddBoardSettingModal;