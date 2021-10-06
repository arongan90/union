import React from 'react';
import styled, {css} from "styled-components";
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

const UploadBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 15px 15px;
  border-radius: 12px;
  border: 1px solid ${colors.ultraLightGray};

  ${({file}) => file && css`
    background: ${colors.borderLightGray};
  `};

  & + & {
    margin-top: 10px;
  }
`;
const PreviewBox = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 7px;
  position: relative;
  overflow: hidden;
  background: ${colors.borderLightGray};
  border: 1px solid lightgray;
`;
const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
`;
const FileInput = styled.input`
  width: 100%;
  height: 100%;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
`;
const FileTitle = styled.div`
  width: 70%;
  font-size: 16px;
  color: ${colors.deepGray}
`;
const Placeholder = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
  line-height: 3.6;
  color: ${colors.inputBorder};
`;
const DeleteButton = styled.div`
  width: 25px;
  height: 30px;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    width: 14px;
    height: 2px;
    position: absolute;
    top: 50%;
    background: ${colors.deepDarkGray};
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const AddBoardSettingModal = ({
                                  handleAddBoardClose,
                                  modalInputsChange,
                                  onVideoUpload,
                                  modalInputs,
                                  imageFile,
                                  onImageUpload,
                                  onImageDelete,
                              }) => {

    return (
        <ModalWrapper>
            <Title>게시물 등록</Title>
            <InputBox>
                <Inputs
                    type="text"
                    name="subject"
                    placeholder="제목을 입력해주세요."
                    value={modalInputs.subject}
                    onChange={modalInputsChange}
                />
            </InputBox>

            <TextArea
                name="content"
                placeholder="내용을 입력해주세요."
                value={modalInputs.content}
                onChange={modalInputsChange}
            >

            </TextArea>

            <UploadBox>
                <PreviewBox>
                    {imageFile && <PreviewImage src={!!imageFile && imageFile}/>}
                </PreviewBox>
                {imageFile ?
                    <>
                        <FileTitle>
                            {imageFile.name}
                        </FileTitle>
                        <DeleteButton onClick={onImageDelete} />
                    </>
                    :
                    <Placeholder>
                        이미지 업로드 하기
                        <FileInput
                            type="file"
                            accept="image/*"
                            onChange={onImageUpload}
                        />
                    </Placeholder>

                }
            </UploadBox>

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