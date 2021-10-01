import React from 'react';
import Modal from '@material-ui/core/Modal';
import styled from "styled-components";
// import * as constants from "../../utils/constants";

// const serverURL = constants.config.chatServer.URL;
// const serverProtocol = constants.config.chatServer.PROTOCOL;

const ModalWrapper = styled(Modal)`
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 10px;
  
  //@media screen and (max-width: 767px) {
  //  width: 320px;
  //  margin: 0 auto;
  //}
`;

const ModalBox = styled.div`
  max-width: 80vw;
  padding: 10px;
  background: white;
  margin: 50px auto;
  
  @media screen and (max-width: 767px) {
    width: 100%;
    max-width: 90vw;
  }
`;

const IframeBox = styled.iframe`
  width: 100%;
  height: 100%;
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PreviewModal = ({ imagePath, youtubeId, videoModal, handleClose }) => {
    return (
        <ModalWrapper
            open={videoModal}
            onClose={handleClose}
        >
            <ModalBox>
                {!!youtubeId &&
                <IframeBox
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    allow="fullscreen"
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                />
                }
                {!!imagePath &&
                    <ImageBox
                        src={`http://172.16.1.192:3000` + imagePath}
                        alt={"이미지"} />
                // <ImageBox src={`${serverProtocol}${serverURL}` + imagePath} />
                }

            </ModalBox>
        </ModalWrapper>
    )
}

export default PreviewModal;