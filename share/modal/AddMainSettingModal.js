import React from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  max-width: 530px;
  height: 580px;
  padding: 20px 15px;
  margin: 20% auto;
  background: ${colors.whiteColor};
`;
const TabMenuBox = styled.ul`
  width: 100%;
  display: flex;
  position: relative;
  margin-bottom: 30px;
  border-bottom: 1px solid ${colors.footerText};

  &:after {
    content: '';
    width: 150px;
    border-bottom: 3px solid ${colors.loginPoint};
    opacity: 0.7;
    position: absolute;
    bottom: 0;
    left: 0;
    transition: 0.2s;
  }

  ${({active}) => active.video && css`
    &:after {
      left: 150px;
    }
  `}
`;
const TabMenu = styled.li`
  width: 150px;
  text-align: center;
  height: 43px;
  line-height: 2.3;
  font-size: 18px;
  color: ${colors.loginTabBorder};
  cursor: pointer;

  ${({active}) => active && css`
    color: ${colors.loginFont};
    font-weight: 500;
  `}
`;
const UploadImageBox = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px 15px 15px;
  border-radius: 12px;
  border: 1px solid ${colors.ultraLightGray};
  background: ${colors.borderLightGray};

  & + & {
    margin-top: 10px;
  }
`;
const PreviewBox = styled.label`
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
  cursor: pointer;
`;
const FileTitle = styled.div`
  width: 70%;
  font-size: 16px;
  color: ${colors.deepGray}
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

const AddMainSettingModal = ({tabActive, onImageTab, onVideoTab, imageFileList, handleUploadImage, handleDeleteImage}) => {
    const {file, previewUrl} = imageFileList;

    return (
        <Wrapper>
            <TabMenuBox active={tabActive}>
                <TabMenu active={tabActive.image} onClick={onImageTab}>이미지 추가</TabMenu>
                <TabMenu active={tabActive.video} onClick={onVideoTab}>동영상 추가</TabMenu>
            </TabMenuBox>
            <UploadImageBox>
                <PreviewBox>
                    {file[0] ?
                        <PreviewImage
                            src={previewUrl[0]}
                        />
                        :
                        <FileInput
                            type="file"
                            accept='image/jpg,image/png,image/jpeg'
                            onChange={handleUploadImage}
                        />
                    }
                </PreviewBox>
                {file[0] &&
                    <>
                        <FileTitle>
                            {file[0].name}
                        </FileTitle>
                        <DeleteButton
                            onClick={() => handleDeleteImage(file[0])}
                        />
                    </>
                }
            </UploadImageBox>
            <UploadImageBox>
                <PreviewBox>
                    {file[1] ?
                        <PreviewImage
                            src={previewUrl[1]}
                        />
                        :
                        <FileInput
                            type="file"
                            accept='image/jpg,image/png,image/jpeg'
                            onChange={handleUploadImage}
                        />
                    }
                </PreviewBox>
                {file[1] &&
                <>
                    <FileTitle>
                        {file[1].name}
                    </FileTitle>
                    <DeleteButton
                        onClick={handleDeleteImage}
                    />
                </>
                }
            </UploadImageBox>
            <UploadImageBox>
                <PreviewBox>
                    {file[2] ?
                        <PreviewImage
                            src={previewUrl[2]}
                        />
                        :
                        <FileInput
                            type="file"
                            accept='image/jpg,image/png,image/jpeg'
                            onChange={handleUploadImage}
                        />
                    }
                </PreviewBox>
                {file[2] &&
                <>
                    <FileTitle>
                        {file[2].name}
                    </FileTitle>
                    <DeleteButton
                        onClick={handleDeleteImage}
                    />
                </>
                }
            </UploadImageBox>
        </Wrapper>
    )
}

export default AddMainSettingModal;