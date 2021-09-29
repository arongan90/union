import React, { useState, useEffect } from 'react';
import BoardSettingPresentational from "../../components/boardSetting/BoardSettingPresentational";
import axios from "axios";
import * as constants from "../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const BoardSetting = ({ settingBoardData }) => {
    const [boardData, setBoardData] = useState([]);
    const [addBoardOpen, setAddBoardOpen] = useState(false);

    const handleAddBoardOpen = () => setAddBoardOpen(true);
    const handleAddBoardClose = () => setAddBoardOpen(false);

    const [allDetailClose, setAllDetailClose] = useState(false);


    useEffect(() => {setBoardData(settingBoardData)}, []);

    return (
        <>
            <BoardSettingPresentational
                boardData={boardData}
                allDetailClose={allDetailClose}
                setAllDetailClose={setAllDetailClose}

                addBoardOpen={addBoardOpen}
                handleAddBoardOpen={handleAddBoardOpen}
                handleAddBoardClose={handleAddBoardClose}
            />
        </>
    )
}

BoardSetting.getInitialProps = async (ctx) => {
    const res = await axios.get(`${serverProtocol}${serverURL}/boardSetting`);

    return {
        settingBoardData: res.data,
    }
}

export default BoardSetting;