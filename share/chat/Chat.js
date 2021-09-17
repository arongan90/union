import React, {useRef, useEffect, useCallback, useState} from 'react';
import styled, {css} from "styled-components";
import colors from "../../styles/colors";
import {
    Favorite,
    KeyboardReturn,
    TextFormat as ScrollStoppedIcon,
    TextRotateVertical as ScrollStartedIcon
} from '@material-ui/icons';
import {lighten, darken} from "polished";
import useInput from "../../hooks/useInput";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage} from "../../modules/chat";
import { ChromePicker } from "react-color";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  
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
  padding: 5px 0 45px;
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
  align-items: center;
  background: ${colors.whiteColor};
  border-top: 1px solid ${colors.inputBorder};
  border-bottom: 1px solid ${colors.inputBorder};
`;
const ChatInput = styled.input`
  width: 100%;
  border: none;
  padding: 0 10px;
  outline: none;
`;
const IconBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px;
  color: ${({iconColor}) => iconColor};
  font-size: 14px;
  cursor: pointer;

  ${({userInfo}) => userInfo && css`
    &:hover {
      color: ${({iconColor}) => lighten(0.1, iconColor)};
    }

    &:active {
      color: ${({iconColor}) => darken(0.1, iconColor)};
    }
  `}
`;
const ColorPaletteBox = styled.div`
  width: 23px;
  height: 23px;
  position: relative;
`;
const ColorPalette = styled.div`
  position: absolute;
  bottom: 35px;
  left: -30px;
  transition: 0.3s;
  visibility: hidden;
  opacity: 0;
  
  ${({ paletteOpen }) => paletteOpen && css`
    visibility: visible;
    opacity: 1;
  `}
`;
const ColorTheme = styled.div`
  width: 20px;
  height: 20px;
  background: ${({bgColor}) => bgColor};
  border-radius: 50%;
  cursor: pointer;
`;

const scrollToBottom = ref => ref.current.scrollTo(0, ref.current.scrollHeight);

const Chat = ({notice, height}) => {
    let chatIndex = 0;
    const scrollRef = useRef();
    const inputRef = useRef();
    const dispatch = useDispatch();
    const {userInfo} = useSelector(state => state.auth);
    const {chat} = useSelector(state => state);
    const [autoScroll, setAutoScroll] = useState(true);
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [choiceColor, setChoiceColor] = useState(colors.chatDefaultColor);
    const [{message}, onChange, onReset] = useInput({ message: '' });
    const { isMobile } = useSelector(state => state.isMobile);
    const onSendMessage = useCallback(() => {
        if (message.length < 1) {
            return false;
        } else {
            let msg = {
                type: "me",
                name: userInfo.nickname,
                text: message,
                time: +new Date(),
                color: choiceColor,
            }
            dispatch(sendMessage(msg));
            onReset();
        }
    }, [message, dispatch, onReset]);

    const handleKeyPress = useCallback(e => {
        if (e.key === "Enter") onSendMessage();
    }, [onSendMessage]);

    const executeScroll = useCallback(() => {
        if (autoScroll) scrollToBottom(scrollRef);
    }, [scrollRef, autoScroll]);

    const toggleScroll = useCallback(() => setAutoScroll(!autoScroll), [autoScroll]);
    const togglePalette = useCallback(() => {
        setPaletteOpen(!paletteOpen)
    },[paletteOpen]);

    const handleColorPicker = async color => {
        setChoiceColor(color);

        try {
            // 선택한 색상 user 정보에 저장
        } catch(e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        executeScroll();
        inputRef.current.focus();
    }, [chat.messages, autoScroll]);

    useEffect(() => {
        if (message) setPaletteOpen(false);
    }, [message]);


    return (
        <Wrapper>
            {!!notice && <NoticeBox>{chat.notice}</NoticeBox>}
            <ChatBox
                notice={notice}
                height={height}
                ref={scrollRef}
            >
                {chat.messages.map(msg => (
                    <MessageBox key={++chatIndex}>
                        <ChatName
                            fontColor={msg.color}
                        >{msg.name}:</ChatName> {msg.text}
                    </MessageBox>
                ))}
            </ChatBox>
            <ChatInputBox>
                <IconBox iconColor={colors.loginDefaultFont} userInfo={userInfo}>
                    <Favorite/>
                </IconBox>
                <IconBox iconColor={colors.loginDefaultFont} userInfo={userInfo} onClick={toggleScroll}>
                    {autoScroll ? <ScrollStartedIcon/> : <ScrollStoppedIcon/>}
                </IconBox>
                <ColorPaletteBox>
                    <ColorTheme
                        bgColor={choiceColor}
                        onClick={togglePalette}
                    />
                    {paletteOpen &&
                        <ColorPalette paletteOpen={paletteOpen}>
                            <ChromePicker
                                color={choiceColor}
                                onChange={color => handleColorPicker(color.hex)}
                            />
                        </ColorPalette>
                    }
                </ColorPaletteBox>
                <ChatInput
                    placeholder={userInfo ? "메세지를 입력해주세요." : "비회원은 채팅을 이용할 수 없습니다."}
                    onChange={onChange}
                    name="message"
                    value={message}
                    onKeyPress={handleKeyPress}
                    ref={inputRef}
                    disabled={!userInfo && "disabled"}
                />
                <IconBox
                    iconColor={colors.loginPoint}
                    userInfo={userInfo}
                    onClick={userInfo && onSendMessage}
                >
                    <KeyboardReturn/>
                </IconBox>
            </ChatInputBox>
        </Wrapper>
    )
}

export default Chat;