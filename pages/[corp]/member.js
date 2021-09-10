import React, {useEffect, useState} from "react";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import {connect, useSelector} from "react-redux";
import moment from 'moment';
import * as constants from "../../utils/constants";
import {useRouter} from "next/router";
import styled from "styled-components";
import axios from "axios";

const serverURL = constants.config.chatServer.URL;
const serverProtocol = constants.config.chatServer.PROTOCOL;

const MemberListWrap = styled.div`
  width: 100%;
  min-height: 100vh;
  padding-top: 60px;
  background: #F3F5F7;
`;
const MemberListBox = styled.div`
  max-width: 530px;
  margin: 25px auto;
  padding: 40px 10px 70px;
  background: #fff;
  box-shadow: 0 0 8px #E3E2E2;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  color: #333333;
  margin-bottom: 30px;
  text-align: center;
`;
const MemberTable = styled.table`
  max-width: 500px;
  margin: 0 auto;
  border: 1px solid #B9B9B9;
  border-radius: 2px;

  thead tr th {
    font-weight: bold;
    background: #EDF5FE;
  }

  th, td {
    height: 34px;
    color: #000;
    font-size: 12px;
    border: 1px solid #B9B9B9;
    text-align: center;
    vertical-align: middle;
  }
`;

function Member({ userData }) {
    const router = useRouter();
    const { userInfo } = useSelector(state => state.auth);

    return (
        <MemberListWrap>
            <MemberListBox>
                {userInfo && userInfo.user_type === 'admin'
                    ? <>
                        <Title>회원목록</Title>
                        <MemberTable>
                            <thead>
                            <tr>
                                <th style={{width: '16%'}}>이름</th>
                                <th style={{width: '25%'}}>닉네임</th>
                                <th style={{width: '29%'}}>전화번호</th>
                                <th style={{width: '16%'}}>추천인</th>
                                <th style={{width: '14%'}}>가입일</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userData.map(member => (
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
                                    </tr>
                                )
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
        </MemberListWrap>
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