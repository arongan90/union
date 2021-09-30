import React, { useState, useEffect } from 'react';
import BoardSettingPresentational from "../../components/boardSetting/BoardSettingPresentational";
import axios from "axios";
import * as constants from "../../utils/constants";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const BoardSetting = ({ settingBoardData, userInfo }) => {
    const [boardData, setBoardData] = useState([]);
    const [addBoardOpen, setAddBoardOpen] = useState(false);
    const [toggleClicked, setToggleClicked] = useState(false);
    const [checkedBoard, setCheckedBoard] = useState(new Set());
    const [checked, setChecked] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    let checkedBoardId = [];

    const handleAddBoardOpen = () => setAddBoardOpen(true);
    const handleAddBoardClose = () => setAddBoardOpen(false);
    const toggleVisible = id => {
        if (toggleClicked === id) return setToggleClicked(null);
        setToggleClicked(id);
    }

    const onCheckedHandler = (id, e) => {
        setChecked(!checked);
        if (e.target.checked) {
            checkedBoard.add(id);
            setCheckedBoard(checkedBoard);
        } else {
            checkedBoard.delete(id);
            setCheckedBoard(checkedBoard);
        }
    }

    const deleteBoard = () => {
        if (checkedBoard.size < 1) {
            alert('삭제할 게시물을 선택해주세요.');
        } else if (confirm("선택된 항목을 삭제하시겠습니까 ?")) {
            try {

                console.info('삭제할 아이디 :', checkedBoardId);

            } catch(e) {
                throw new Error(e);
            }
        }
    }

    const onImageUpload = e => {
        let reader = new FileReader();
        let img = e.target.files[0];
        const formData = new FormData();

        formData.append('imageFile', e.target.files[0]);

        reader.onload = () => {
            setImageFile(reader.result);
        }

        reader.readAsDataURL(img);
    }

    const onImageDelete = () => {
        setImageFile(null);
    }

    useEffect(() => {
        checkedBoard.forEach(id => checkedBoardId.push(id));
    }, [checked]);

    useEffect(() => {setBoardData(settingBoardData)}, []);

    return (
        <>
            <BoardSettingPresentational
                userInfo={userInfo}
                boardData={boardData}
                checkedBoard={checkedBoard}
                toggleClicked={toggleClicked}
                toggleVisible={toggleVisible}
                onCheckedHandler={onCheckedHandler}
                deleteBoard={deleteBoard}
                imageFile={imageFile}
                onImageUpload={onImageUpload}
                onImageDelete={onImageDelete}

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