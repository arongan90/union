import React, { useRef, useEffect, useCallback } from 'react';
import styled, { css } from "styled-components";
import colors from "../../styles/colors";
import { Favorite, KeyboardReturn } from '@material-ui/icons';
import { lighten, darken } from "polished";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../modules/chat";

const Wrapper = styled.div`
  width: 100%;
  position: relative;
`;
const NoticeBox = styled.div`
  padding: 10px;
  font-size: 20px;
  font-weight: 600;
  box-sizing: border-box;
  border: 1px solid ${colors.lightGray};
  color: ${colors.deepBlue};
  background: ${colors.borderLightGray};
`;
const ChatBox = styled.div`
  height: ${({height}) => height};
  overflow: hidden;
  overflow-y: scroll;
  padding: 10px 0;
  ${({notice}) => notice && css`
    height: calc(100vh - 200px);
  `}
`;
const MessageBox = styled.div`
  padding: 0 5px;
  font-size: 18px;
  text-align: left;
  color: ${colors.chatDefaultColor};
  font-weight: 400;
`;
const ChatName = styled.span`
  font-size: 20px;
  font-weight: 500;
  margin-right: 3px;
  color: ${({fontColor}) => fontColor ? fontColor : colors.chatDefaultColor};
`;
const ChatInputBox = styled.div`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${colors.whiteColor};
  border-top: 1px solid ${colors.inputBorder};
  border-bottom: 1px solid ${colors.inputBorder};
`;
const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  color: ${({iconColor}) => iconColor};
  cursor: pointer;

  &:hover {
    color: ${({iconColor}) => lighten(0.1, iconColor)};
  }
  
  &:active {
    color: ${({iconColor}) => darken(0.1, iconColor)};
  }
`;
const ChatInput = styled.input`
  width: 100%;
  padding: 0 10px;
  outline: none;
  border: none;
`;

const scrollToBottom = ref => ref.current.scrollTo(0, ref.current.scrollHeight);

const Chat = ({ notice, height }) => {
    const scrollRef = useRef();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.auth);
    const { chat } = useSelector(state => state);
    let chatIndex = 0;

    const [{message}, onChange, onReset] = useInput({
        message: '',
    });
    const onSendMessage = useCallback(() => {
        if (message.length < 1) {
            return false;
        } else {
            let msg = {
                type: "me",
                name: userInfo.nickname,
                text: message,
                time: + new Date(),
                color: chat.color,
            }
            dispatch(sendMessage(msg));
            onReset();
        }
    }, [message, dispatch, onReset]);

    const handleKeyPress = useCallback(e => {
        if (e.key === "Enter") {
            onSendMessage();
        }
    }, [onSendMessage]);

    useEffect(() => {
        inputRef.current.focus();
        console.info(chat);
    }, [chat]);

    return (
        <Wrapper>
            {!!notice && <NoticeBox>{chat.notice}</NoticeBox>}
            <ChatBox notice={notice} height={height}>
                {chat.messages.map(msg => (
                    <MessageBox key={++chatIndex}>
                        <ChatName>{msg.name}:</ChatName> {msg.text}
                    </MessageBox>
                ))}
            </ChatBox>
            <ChatInputBox>
                <IconBox iconColor={colors.heartColor}>
                    <Favorite/>
                </IconBox>
                <ChatInput
                    placeholder="메세지를 입력해주세요."
                    onChange={onChange}
                    name="message"
                    value={message}
                    onKeyPress={handleKeyPress}
                    ref={inputRef}
                />
                <IconBox
                    iconColor={colors.loginPoint}
                    onClick={onSendMessage}
                >
                    <KeyboardReturn />
                </IconBox>
            </ChatInputBox>
        </Wrapper>
    )
}

export default Chat;