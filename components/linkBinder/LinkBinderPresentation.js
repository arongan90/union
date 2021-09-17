import React from 'react'
import styled from "styled-components";
import ThumbNail from "./ThumbNail";
import CounterInfo from "./VisitCount";
import LinkContents from "./LinkContents";
import colors from "../../styles/colors";
import Footer from "../Footer";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.tabMenu};
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

            <Footer />
        </Wrapper>
    )
}

export default LinkBinderPresentation;
