import React, { useState, useEffect } from 'react';
import BoardSettingPresentational from "../../components/boardSetting/BoardSettingPresentational";
import axios from "axios";
import * as constants from "../../utils/constants";
import {useRouter} from "next/router";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const BoardSetting = ({ settingBoardData, userInfo }) => {
    const router = useRouter();
    const [boardData, setBoardData] = useState([]);
    const [addBoardOpen, setAddBoardOpen] = useState(false);
    const [toggleClicked, setToggleClicked] = useState(false);
    const [checkedBoard, setCheckedBoard] = useState(new Set());
    const [checked, setChecked] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [modalInputs, setModalInputs] = useState({
        subject: "",
        content: "",
    });
    let checkedBoardId = [];

    const handleAddBoardOpen = () => setAddBoardOpen(true);
    const handleAddBoardClose = () => {
        setAddBoardOpen(false);
        setImageFile(null);
        setModalInputs({
            subject: "",
            content: "",
        });
    }
    const handleUpdateBoard = async id => {
        handleAddBoardOpen();
        try {
            const res = await axios.get(`${serverProtocol}${serverURL}/boardSetting/${id}`);
            setModalInputs({
                subject: res.data.subject,
                content: res.data.content,
            });
            setImageFile(res.data.image_path);
        } catch(e) {
            throw new Error();
        }
    }

    const modalInputsChange = e => {
        const { value, name } = e.target;
        setModalInputs({
            ...modalInputs,
            [name]: value,
        });
    }

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

    const deleteBoard = async () => {
        if (checkedBoard.size < 1) {
            alert('????????? ???????????? ??????????????????.');
        } else if (confirm("????????? ????????? ???????????????????????? ?")) {
            try {

                console.info('????????? ????????? :', checkedBoardId);

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
        formData.append('subject', modalInputs.subject);
        formData.append('content', modalInputs.content);

        reader.onload = () => {
            setImageFile(reader.result);
        }
        reader.readAsDataURL(img);

        setImageFile(null);
        setModalInputs({
            subject: "",
            content: "",
        });
    }

    const onImageDelete = () => setImageFile(null);

    useEffect(() => {
        checkedBoard.forEach(id => checkedBoardId.push(id));
    }, [checked]);

    useEffect(() => {setBoardData(settingBoardData)}, []);
    useEffect(() => {
        if (!userInfo || (userInfo && userInfo.user_type !== "admin")) {
            alert('?????? ????????? ????????????.');
            router.push(`/`);
        }
    }, [userInfo]);

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
                modalInputs={modalInputs}
                imageFile={imageFile}
                onImageUpload={onImageUpload}
                onImageDelete={onImageDelete}

                addBoardOpen={addBoardOpen}
                modalInputsChange={modalInputsChange}
                handleAddBoardOpen={handleAddBoardOpen}
                handleAddBoardClose={handleAddBoardClose}
                handleUpdateBoard={handleUpdateBoard}

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