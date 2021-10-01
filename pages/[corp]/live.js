import React, { useState, useEffect } from 'react';
import LivePresentational from "../../components/live/LivePresentational";
import socketIO from "socket.io-client";
import {useDispatch, useSelector} from "react-redux";
import {initSocket, closeSocket} from "../../modules/chat";
import * as constants from "../../utils/constants";

const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const Live = () => {
    const [chatDrawer, setChatDrawer] = useState(true);
    const openChat = () => setChatDrawer(true);
    const closeChat = () => setChatDrawer(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initSocket(socketIO(`ws://172.16.1.192:5050`)));

        return () => closeSocket();
    }, [dispatch]);

    return (
        <>
            <LivePresentational
                chatDrawer={chatDrawer}
                openChat={openChat}
                closeChat={closeChat}
            />
        </>
    )
}

Live.getInitialProps = async (ctx) => {

}

export default Live;