import React from 'react'
import styled from "styled-components";
import ThumbNail from "./ThumbNail";
import VisitCount from "./VisitCount";
import LinkContents from "./LinkContents";
import colors from "../../styles/colors";
import Footer from "../Footer";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${colors.tabMenu};
`;

const LinkBinderPresentational = ({
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
                                    toggleVisible,
                                }) => {
    return (
        <Wrapper>
            <ThumbNail/>
            <VisitCount/>
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
                toggleVisible={toggleVisible}
            />
            <Footer />
        </Wrapper>
    )
}

export default LinkBinderPresentational;
