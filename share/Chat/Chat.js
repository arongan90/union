import React from 'react';
import styled from "styled-components";
import colors from "../../styles/colors";

const Wrap = styled.div`
  width: 100%;
  height: 100%;
`;
const NoticeBox = styled.div`
  position: sticky;
  width: calc(100% + 20px);
  font-size: 16px;
  text-align: center;
  font-weight: 600;
  color: ${colors.deepBlue};
`;
const ChatBox = styled.div``;

const Chat = () => {
    return (
        <Wrap>

        </Wrap>
    )
}

export default Chat;