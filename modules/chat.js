const INIT_SOCKET = "chat/INIT_SOCKET";
const CLOSE_SOCKET = "chat/CLOSE_SOCKET";
const LOAD_HISTORY = "chat/LOAD_HISTORY";
const SEND_MESSAGE = "chat/SEND_MESSAGE";
const BAN_USER = "chat/BAN_USER";
const SET_USER_INFO = "chat/SET_USER_INFO";
const SET_NOTICE = "chat/SET_NOTICE";
const CLEAR_CHAT = "chat/CLEAR_CHAT";

const writeMessage = (type, name, text, time, color) => ({
    type: type,
    name: name,
    text: text,
    time: time,
    color: color,
});

function* reversKeys(arr) {
    let key = arr.length - 1;

    while (key >= 0) {
        yield key;
        key -= 1;
    }
}

export const initSocket = socket => ({type: INIT_SOCKET, socket});
export const closeSocket = () => ({type: CLOSE_SOCKET});
export const setNotice = notice => ({type: SET_NOTICE, notice});
export const clearChat = () => ({type: CLEAR_CHAT});
export const banUser = user => ({type: BAN_USER, user});
export const loadHistory = historyMessages => {
    let messages = [];
    historyMessages.map(msg => messages.concat(writeMessage("other", msg.name, msg.text, msg.time, msg.color)));
    return {type: LOAD_HISTORY, messages};
}
export const sendMessage = msg => {
    let message = writeMessage("me", msg.name, msg.text, +new Date, msg.color);
    return {type: SEND_MESSAGE, message};
}
export const setUserInfo = (name, color) => {
    let info = {
        name: name,
        color: color
    }
    return {type: SET_USER_INFO, info};
}

const initialState = {
    messages: [],
    message: '',
    name: '비회원',
    color: '#333333',
    socket: undefined,
    progress: 100,
    notice: '',
}

export default function chat(state = initialState, action) {
    switch (action.type) {
        case INIT_SOCKET:
            return {
                ...state,
                socket: action.socket,
            }
        case CLOSE_SOCKET:
            if (state.socket) state.socket.disconnect();
            return {
                ...state,
                socket: undefined,
            }
        case LOAD_HISTORY:
            return {
                ...state,
                messages: state.messages.concat(action.messages),
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: state.messages.concat(action.message),
                name: action.name,
                color: action.color
            }
        case BAN_USER:
            let newMsg = [...state.messages];
            for (let index of reversKeys(newMsg)) {
                if (newMsg[index].name === action.user) {
                    newMsg.splice(index, 1);
                }
            }
            return {
                ...state,
                messages: newMsg
            }
        case SET_USER_INFO:
            return {
                ...state,
                name: action.info.name,
                color: action.info.color
            }
        case SET_NOTICE:
            return {
                ...state,
                notice: action.notice
            }
        case CLEAR_CHAT:
            return {
                ...state,
                messages: []
            }
        default:
            return state;
    }
}
