import React from 'react'
import styled from "styled-components";
import ThumbNail from "./ThumbNail";
import CounterInfo from "./VisitCount";
import LinkContents from "./LinkContents";
import colors from "../../styles/colors";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30px;
  background: ${colors.linkBgColor};
`;


const LinkBinderPresentation = ({
                                    linkList,
                                    editOrder,
                                    userInfo,
                                    router,
                                    goPage,
                                    onSortEnd,
                                    deleteCard,
                                    handleEditOpen,
                                    handleEditCancel,
                                    handleEditComplete,
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
                deleteCard={deleteCard}
                handleEditOpen={handleEditOpen}
                handleEditCancel={handleEditCancel}
                handleEditComplete={handleEditComplete}
            />

        </Wrapper>
    )
}

export default LinkBinderPresentation;
