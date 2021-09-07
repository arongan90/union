import React from 'react';
import styled from "styled-components";
import Chat from "../../share/chat/Chat";

const Wrapper = styled.div`
  width: 100%;
`;

const LiveChat = () => {
    return (
        <Wrapper>
            <Chat height={"calc(100vh - 60px)"} />
        </Wrapper>
    )
}

export default LiveChat;