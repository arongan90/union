import React, {useState} from 'react';
import styled, {css} from "styled-components";
import Grid from "@material-ui/core/Grid";
import playButton from "/public/images/home/playButton.svg";
import PreviewModal from "../../share/modal/PreviewModal";
import MoreButton from "./MoreButton";
import colors from "../../styles/colors";

const UploadVideoWrapper = styled.div`
  max-width: 530px;
  min-height: 300px;
  height: ${props => props.embedLength > 2 ? 680 : 300}px;
  margin: 0 auto;
  padding: 20px 10px 50px;
  box-sizing: border-box;
  background-color: ${colors.whiteColor};
  border: 1px solid ${colors.corpMainBorder};
  box-shadow: 0 0 10px ${colors.ultraLightGray};
  position: relative;
  overflow: hidden;
  transition: 0.4s;
  ${props => props.moreView && css`
    height: ${props.embedLength / 2 * 268 + 300}px;
  `}
`;

const GirdBox = styled(Grid)`
  margin: 0;
  justify-content: space-between;
`;
const GridItem = styled.div`
  width: 49%;
  margin-bottom: 10px;
  border: 1px solid #EEEEEE;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
`;

const TitleText = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #333333;
  text-align: left;
  margin: 0 0 24px 5px;
`;

const EmbedImage = styled.img`
  width: 100%;
  height: 165px;
  object-fit: cover;
`;

const TitleBox = styled.div`
  width: 100%;
  height: 67px;
  font-weight: 500;
  font-size: 16px;
  color: #222222;
  text-align: left;
  padding: 12px 20px 9px 20px;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SubTitleBox = styled.div`
  width: 100%;
  font-size: 14px;
  color: #555555;
  text-align: left;
  padding: 0 0 12px 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PlayButton = styled.img`
  width: 30px;
  position: absolute;
  top: 30%;
  left: 52%;
  z-index: 5;
  transform: translate(-50%, -50%);
`;

const UploadVideo = ({videoList}) => {
    const [videoModal, setVideoModal] = useState(false);
    const [youtubeId, setYoutubeId] = useState();
    const [moreView, setMoreView] = useState(false);

    const onToggleMore = () => {
        setMoreView(prevView => !prevView);
    }

    const handleClose = () => {
        setVideoModal(false);
    }
    const onClick = (id) => {
        setYoutubeId(id);
        setVideoModal(true);
    }

    return (
        <UploadVideoWrapper
            moreView={moreView}
            embedLength={videoList && videoList.length}
        >
            <TitleText>????????????</TitleText>
            <GirdBox container>
                {!moreView
                    ? videoList.slice(0, 4).map((item) => (
                            <GridItem item xs={6} key={item.id} onClick={() => onClick(item.youtubeId)}>
                                <PlayButton src={playButton}/>
                                <EmbedImage src={`https://img.youtube.com/vi/${item.youtubeId}/0.jpg`}/>
                                <TitleBox>{item.title}</TitleBox>
                                <SubTitleBox>{item.title_sub}</SubTitleBox>
                            </GridItem>
                        ))
                    : videoList.map((item) => (
                            <GridItem item xs={6} key={item.id} onClick={() => onClick(item.youtubeId)}>
                                <PlayButton src={playButton}/>
                                <EmbedImage src={`https://img.youtube.com/vi/${item.youtubeId}/0.jpg`}/>
                                <TitleBox>{item.title}</TitleBox>
                                <SubTitleBox>{item.title_sub}</SubTitleBox>
                            </GridItem>
                        ))
                }
            </GirdBox>
            {(videoList && videoList.length > 4) &&
            <MoreButton
                onToggle={onToggleMore}
                moreView={moreView}
            />
            }
            <PreviewModal
                youtubeId={youtubeId}
                videoModal={videoModal}
                handleClose={handleClose}
            />
        </UploadVideoWrapper>
    )
}

export default UploadVideo;