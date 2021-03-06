import React, {useEffect} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import {darken, lighten} from "polished";

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

const UrlInput = styled.input`
  width: 80%;
  outline: none;
  height: 40px;
  padding: 0 10px;
  border: none;
  background: inherit;
`;

const ButtonGroup = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 49%;
  height: 50px;
  border-radius: 7px;
  font-size: 16px;
  color: ${({fontColor}) => fontColor};

  ${({border}) => border && css`
    border: ${border};
  `}

  ${({bgColor}) => bgColor && css`
    background: ${bgColor};

    &:hover {
      background: ${lighten(0.1, bgColor)}
    }

    &:active {
      background: ${darken(0.1, bgColor)}
    }
  `}
`;

const AddMainSettingModal = ({
                                 handleAddLinkClose,
                                 tabActive,
                                 onImageTab,
                                 onVideoTab,
                                 fileList,
                                 handleUploadImage,
                                 handleDeleteImage,
                                 handleDeleteUrl,
                                 videoUrl_1,
                                 videoUrl_2,
                                 videoUrl_3,
                                 onVideoUrlChange,
                                 handleImageUpload,
                                 handleVideoUpload,
                             }) => {

    const {file, previewUrl, videoList} = fileList;

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") handleAddLinkClose();
        });
    }, []);

    return (
        <Wrapper>
            <TabMenuBox active={tabActive}>
                <TabMenu active={tabActive.image} onClick={onImageTab}>????????? ??????</TabMenu>
                <TabMenu active={tabActive.video} onClick={onVideoTab}>????????? ??????</TabMenu>
            </TabMenuBox>
            {tabActive.image ?
                [...Array(3)].map((num, index) => {
                    return (
                        <UploadBox
                            key={index}
                            file={file[index]}
                        >
                            <PreviewBox>
                                {file[index] && <PreviewImage src={file[index].image_path}/>}
                            </PreviewBox>
                            {file[index] ?
                                <>
                                    <FileTitle>
                                        {file[index].name}
                                    </FileTitle>
                                    <DeleteButton onClick={() => handleDeleteImage(file[index])}/>
                                </>
                                :
                                <Placeholder>
                                    ????????? ????????? ??????
                                    <FileInput
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUploadImage}
                                    />
                                </Placeholder>
                            }
                        </UploadBox>
                    )
                })
                :
                <>
                    <UploadBox>
                        <UrlInput
                            name="videoUrl_1"
                            placeholder="url??? ??????????????????."
                            value={videoUrl_1}
                            onChange={onVideoUrlChange}
                        />
                        <DeleteButton
                            onClick={() => handleDeleteUrl(0)}
                        />
                    </UploadBox>
                    <UploadBox>
                        <UrlInput
                            name="videoUrl_2"
                            placeholder="url??? ??????????????????."
                            value={videoUrl_2}
                            onChange={onVideoUrlChange}
                        />
                        <DeleteButton
                            onClick={() => handleDeleteUrl(1)}
                        />
                    </UploadBox>
                    <UploadBox>
                        <UrlInput
                            name="videoUrl_3"
                            placeholder="url??? ??????????????????."
                            value={videoUrl_3}
                            onChange={onVideoUrlChange}
                        />
                        <DeleteButton
                            onClick={() => handleDeleteUrl(2)}
                        />
                    </UploadBox>
                </>
            }
            <ButtonGroup>
                <Button
                    border={`1px solid ${colors.footerText}`}
                    fontColor={colors.loginDefaultFont}
                    bgColor={colors.whiteColor}
                    onClick={handleAddLinkClose}
                >??? ???</Button>
                <Button
                    border="none"
                    fontColor={colors.whiteColor}
                    bgColor={colors.deepDarkBlue}
                    onClick={tabActive.image ? handleImageUpload : handleVideoUpload}
                >??? ??? ???</Button>
            </ButtonGroup>
        </Wrapper>
    )
}

export default AddMainSettingModal;
