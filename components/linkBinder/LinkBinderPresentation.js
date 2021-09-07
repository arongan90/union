import React from 'react'
import styled from "styled-components";
import ThumbNail from "./ThumbNail";
import CounterInfo from "./VisitCount";
import LinkContents from "./LinkContents";
import colors from "../../styles/colors";
// Image
import catBellImage from "/public/images/linkBinder/catbellIcon.png";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  background: ${colors.linkBgColor};
`;
const IconBox = styled.div`
  width: 100%;
`;
const ImageBox = styled.div`
  width: 63px;
  height: 20px;
  margin: 0 auto;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    transform: translate(-50%, -10px);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: ${colors.deepSkyBlue};
  }
`;
const CatbellImage = styled.img`
  width: 100%;
  height: 100%;
  mix-blend-mode: multiply;
`;

const LinkBinderPresentation = ({
                                    linkList,
                                    editOrder,
                                    userInfo,
                                    router,
                                    goPage,
                                    onSortEnd,
                                    updateOrder,
                                    deleteCard,
                                    handleEditOrder,
                                }) => {
    return (
        <Wrapper>
            <ThumbNail/>
            <CounterInfo/>
            <LinkContents
                linkList={linkList}
                editOrder={editOrder}
                userInfo={userInfo}
                router={router}
                goPage={goPage}
                onSortEnd={onSortEnd}
                updateOrder={updateOrder}
                deleteCard={deleteCard}
                handleEditOrder={handleEditOrder}
            />
            <IconBox>
                <ImageBox>
                    <CatbellImage src={catBellImage}/>
                </ImageBox>
            </IconBox>
        </Wrapper>
    )
}

export default LinkBinderPresentation;
