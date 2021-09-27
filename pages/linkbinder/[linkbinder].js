import React, {useState, useEffect, useCallback} from 'react';
import LinkBinderPresentation from "../../components/linkBinder/LinkBinderPresentation";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import arrayMove from "array-move";
import {useRouter} from "next/router";
import * as constants from "../../utils/constants";
import initialize from "../../utils/initialize";
import {setCorp} from "../../modules/corpInfo";
import {toast} from "react-toastify";

const serverProtocol = constants.config.chatServer.PROTOCOL;
const serverURL = constants.config.chatServer.URL;

const LinkBinder = ({linkData, corpName}) => {
    const router = useRouter();
    const [linkList, setLinkList] = useState(linkData);
    const [editOrder, setEditOrder] = useState(false);
    const [linkIndex, setLinkIndex] = useState([]);
    const [copyLinkList, setCopyLinkList] = useState([]);
    const {userInfo} = useSelector(state => state.auth);
    let deleteLink = [];

    const goPage = async (value) => {
        let parameter = {
            link_id: value.link_id
        }
        try {
            // const resultData = await bsApi.post("/link/viewCount", parameter);
        } catch (e) {
            throw new Error(e);
        }
        window.open(`${value.address}`);
    }

    const toggleVisible = useCallback(secure => {
        if (secure) {
            toast.info("비공개로 설정 되었습니다.");
        } else {
            toast.info("공개로 설정 되었습니다.");
        }
    }, []);

    const onSortEnd = ({oldIndex, newIndex}) => {
        setCopyLinkList(linkList);

        let sortResult = arrayMove(linkList, oldIndex, newIndex);
        let reSortData = sortResult.map((value) => {
            return value.link_id
        });

        setLinkIndex(reSortData);
        setLinkList(sortResult);
    };

    const deleteCard = async (link_id) => {
        if (confirm('정말로 삭제하시겠습니까?')) {
            deleteLink.push(link_id);

            try {
                // const resultData = await bsApi.post("/link/deleteLink", deleteLink);
                // if (resultData.data.success === true) {
                //     router.reload();
                //     deleteLink = [];
                // }
            } catch (e) {
                throw new Error(e);
            }
        }
    }

    const handleEditOpen = () => setEditOrder(true);
    const handleEditCancel = () => {
        setLinkList(copyLinkList);
        setEditOrder(false);
    }
    const handleEditComplete = async () => {
        let params = {
            cp_id: userInfo.cp_id,
            list_index: linkIndex
        }
        try {
            // await bsApi.post(`/link/updateIndex`, params);
            setCopyLinkList(linkList);
            setEditOrder(false);
        } catch (e) {
            throw new Error(e);
        }
    }

    useEffect(() => {
        setCopyLinkList(linkList);
    }, []);

    return (
        <LinkBinderPresentation
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
    );
}

LinkBinder.getInitialProps = async (ctx) => {

    const res = await axios.get(`${serverProtocol}${serverURL}/linkbinder`);
    const linkData = res.data;


    return {
        linkData,
    }
};

export default LinkBinder;