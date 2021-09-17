import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import {connect, useSelector} from "react-redux";
import * as constants from "../../utils/constants";
import {useRouter} from "next/router";
import styled from "styled-components";
import axios from "axios";
import colors from "../../styles/colors";
import Switch from '@material-ui/core/Switch';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderButton from "../../share/components/OrderButton";
import useInput from "../../hooks/useInput";
// import moment from 'moment';


const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 60px);
  padding-top: 60px;
  background: ${colors.tabMenu};
`;
const MemberListBox = styled.div`
  max-width: 530px;
  margin: 25px auto;
  padding: 40px 10px 70px;
  background: #fff;
  box-shadow: 0 0 8px ${colors.lightShadowColor};
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: ${colors.chatDefaultColor};
  margin-bottom: 30px;
  text-align: center;
`;
const SearchBox = styled.div`
  width: 100%;
  height: 45px;
  border-radius: 2px;
  margin-bottom: 15px;
  padding: 4px;
  display: flex;
  align-items: center;
  border: 1px solid ${colors.loginTabBorder}
`;
const SearchInput = styled.input`
  width: 90%;
  height: 100%;
  border: none;
  outline: none;
  padding-left: 10px;
  
  &::placeholder {
    color: ${colors.ultraLightGray}
  }
`;
const MemberTable = styled.table`
  width: 100%;
  margin: 0 auto;
  border: 1px solid #B9B9B9;
  border-radius: 2px;

  thead tr th {
    font-weight: bold;
    background: ${colors.borderLightGray};
  }

  th, td {
    height: 34px;
    color: ${colors.blackColor};
    font-size: 12px;
    border: 1px solid #B9B9B9;
    text-align: center;
    vertical-align: middle;
  }
`;

function Member({userData}) {
    const router = useRouter();
    const {userInfo} = useSelector(state => state.auth);
    const [{memberInfo}, onChange, onReset] = useInput({memberInfo: ''})


    const handleSwitch = (e, name) => {
        if (!e.target.checked) {
            if(confirm(`${name} 님의 승인을 취소하시겠습니까?`)) {
                console.info('승인 취소 ::: ');
            }
        } else {
            toast.info(`${name}님의 가입승인이 완료되었습니다.`);
        }
    }

    const searchMember = async () => {
        try {
            const res = await axios.get(``);
            onReset();
        } catch(e) {
            throw new Error(e);
        }
    }

    return (
        <Wrapper>
            <MemberListBox>
                {userInfo && userInfo.user_type === 'admin'
                    ? <>
                        <Title>회원목록</Title>

                        <SearchBox>
                            <SearchInput
                                type="text"
                                name="memberInfo"
                                placeholder="회원을 검색해주세요."
                                value={memberInfo}
                                onChange={onChange}
                            />
                            <OrderButton
                                width={85}
                                height={37}
                                bgColor={colors.loginPoint}
                                fontColor={colors.whiteColor}
                                borderRadius="2px"
                                onClick={searchMember}
                            >검색</OrderButton>
                        </SearchBox>
                        <MemberTable>
                            <thead>
                            <tr>
                                <th style={{width: '14%'}}>이름</th>
                                <th style={{width: '20%'}}>닉네임</th>
                                <th style={{width: '29%'}}>전화번호</th>
                                <th style={{width: '13%'}}>추천인</th>
                                <th style={{width: '14%'}}>가입일</th>
                                <th style={{width: '14%'}}>가입승인</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userData.map((member, i) => {
                                    return (
                                        <tr key={member.id}>
                                            <td>{member.name}</td>
                                            <td>{member.nickname}</td>
                                            <td>{member.phone_no}</td>
                                            <td>{member.recommender}</td>
                                            <td>
                                                {/*
                                                {moment(member.reg_dt).format('MM.DD')}
                                            */}
                                                {member.reg_dt}
                                            </td>
                                            <td>
                                                <Switch
                                                    color="primary"
                                                    name={member.id.toString()}
                                                    onChange={(e) => handleSwitch(e, member.name)}
                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            )}
                            </tbody>
                        </MemberTable>
                    </>
                    : (
                        <div>
                            <Avatar style={{margin: '0px auto', marginBottom: 40}}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                권한이 없습니다.
                            </Typography>
                        </div>
                    )
                }
            </MemberListBox>
            <ToastContainer autoClose={3000} />
        </Wrapper>
    );
}

Member.getInitialProps = async (ctx) => {
    const res = await axios.get('http://localhost:4000/member');
    const userData = res.data;

    return {
        userData
    }
}

export default Member;