import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import DaumPostcode from "react-daum-postcode";
import {lighten, darken} from "polished";
import {
    TextField,
    Modal,
    Dialog,
    DialogContent,
    DialogTitle
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import colors from '../../styles/colors';
import Terms from "./Term";
import closeIcon from "/public/images/layout/closeIcon.svg";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0 60px;
  background: ${colors.deepWhite};
`;
const Title = styled.h1`
  font-size: 30px;
  margin: 0 auto 10px;
  text-align: center;
`;
const Form = styled.form`
  max-width: 400px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`;
const InputBox = styled.div`
  margin: 0 auto 20px;
  ${({term}) => term && css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `}
  
  ${({ valid }) => valid && css`
    .MuiFormLabel-root {
      color: blue;
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: blue;
    }
  `}
  
  //.MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline {
  //  border-color: blue;
  //}
  //.MuiFormLabel-root.Mui-error,
  //.MuiFormLabel-asterisk.Mui-error {
  //  color: blue;
  //}
`;
const Inputs = styled(TextField)`
  width: 100%;
  
  input {
    border-radius: 4px;
    background: ${colors.whiteColor};
  }
`;
const PostModal = styled(Modal)`
  width: 500px;
  margin: 30% auto;
`;
const AgreeLabel = styled(FormControlLabel)`
  .Mui-checked {
    color: ${colors.loginPoint};
  }
`;
const AgreeCheckBox = styled(Checkbox)`
  color: ${colors.inputBorder};
`;
const ShowTerm = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: ${colors.loginPoint};
  cursor: pointer;
  text-decoration: underline;
  text-underline-position: under;
`;
const Button = styled.button`
  width: 100%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  color: ${colors.whiteColor};
  background: ${colors.loginPoint};

  &:hover {
    background: ${lighten(0.1, colors.loginPoint)};
  }

  &:active {
    background: ${darken(0.1, colors.loginPoint)};
  }
`;
const DialogTitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DialogClose = styled.div`
  width: 30px;
  height: 30px;
  cursor: pointer;
  background: url(${closeIcon}) no-repeat center;
`;


const SignUpPresentational = ({
                                  validate,
                                  helperText,
                                  setHelperText,
                                  data,
                                  setData,
                                  emailDomains,
                                  autoHyphenPhone,
                                  validateData,
                                  openAddress,
                                  setOpenAddress,
                                  handleAddressComplete,
                                  openTerm,
                                  setOpenTerm,
                                  onSubmit
                              }) => {
    return (
        <Wrapper>
            <Title>회원가입</Title>
            <Form noValidate>
                <InputBox valid={validate.email}>
                    <Inputs
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        autoComplete="email"
                        required
                        helperText={helperText.email}
                        onChange={e => validateData(e, 'email')}
                    />
                </InputBox>
                <InputBox valid={validate.password}>
                    <Inputs
                        id="password"
                        name="email"
                        label="비밀번호"
                        type="password"
                        variant="outlined"
                        autoComplete="current-password"
                        required
                        helperText={helperText.password}
                        onChange={e => validateData(e, 'password')}
                    />
                </InputBox>
                <InputBox valid={validate.password2}>
                    <Inputs
                        id="password2"
                        name="password2"
                        label="비밀번호 확인"
                        type="password"
                        variant="outlined"
                        required
                        helperText={helperText.password2}
                        onChange={e => validateData(e, 'password2')}
                    />
                </InputBox>
                <InputBox valid={validate.name}>
                    <Inputs
                        id="name"
                        name="name"
                        label="이름"
                        variant="outlined"
                        autoComplete="name"
                        required
                        helperText={helperText.name}
                        onChange={e => validateData(e, 'name')}
                    />
                </InputBox>
                <InputBox valid={validate.phoneNo}>
                    <Inputs
                        id="phoneNo"
                        name="phoneNo"
                        label="전화번호"
                        variant="outlined"
                        autoComplete="phoneNo"
                        required
                        helperText={helperText.phoneNo}
                        onKeyUp={autoHyphenPhone}
                    />
                </InputBox>
                <InputBox valid={validate.nickname}>
                    <Inputs
                        id="nickname"
                        name="nickname"
                        label="닉네임"
                        variant="outlined"
                        autoComplete="nickname"
                        required
                        helperText={helperText.nickname}
                        onInput={e => e.target.value = e.target.value.slice(0, 12)}
                        onChange={e => validateData(e, 'nickname')}
                    />
                </InputBox>
                <InputBox valid={validate.region}>
                    <Inputs
                        id="region"
                        name="region"
                        label="생활지역 (시, 군, 구단위)"
                        variant="outlined"
                        InputProps={{readOnly: true}}
                        required
                        onClick={() => setOpenAddress(true)}
                        helperText={validate.region ? '' : helperText.region}
                    />
                    <PostModal
                        open={openAddress}
                        onClose={() => setOpenAddress(false)}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <DaumPostcode onComplete={handleAddressComplete} />
                    </PostModal>
                </InputBox>
                <InputBox valid={validate.snsUrl}>
                    <Inputs
                        id="snsUrl"
                        name="snsUrl"
                        label="개인 SNS주소"
                        variant="outlined"
                        autoComplete="sns"
                        required
                        helperText={helperText.snsUrl}
                        onInput={e => e.target.value = e.target.value.slice(0, 255)}
                        onChange={e => {
                            validateData(e, 'snsUrl');
                            //     let newValidate = {...validate};
                            //     if (e.target.value.length > 0) {
                            //         let tmp = {...data};
                            //         tmp.name = e.target.value;
                            //         newValidate.name = true;
                            //         setData(tmp);
                            //     } else {
                            //         newValidate.name = false;
                            //     }
                            //     setValidate(newValidate);
                        }
                        }
                    />
                </InputBox>
                <InputBox valid={validate.recommender}>
                    <Inputs
                        id="recommender"
                        name="recommender"
                        label="추천인 이름"
                        variant="outlined"
                        required
                        helperText={helperText.recommender}
                    />
                </InputBox>

                <InputBox term>
                    <AgreeLabel
                        control={<AgreeCheckBox name="agree"/>}
                        label="회원가입 정책에 동의합니다."
                    />
                    <ShowTerm
                        onClick={() => setOpenTerm(true)}
                    >약관 보기</ShowTerm>
                    <Dialog
                        open={openTerm}
                        onClose={() => setOpenTerm(false)}
                        scroll="paper"
                    >
                        <DialogTitle id="scroll-dialog-title">
                            <DialogTitleBox>
                                회원가입약관
                                <DialogClose onClick={() => setOpenTerm(false)}/>
                            </DialogTitleBox>
                        </DialogTitle>
                        <DialogContent dividers={true}>
                            <Terms/>
                        </DialogContent>
                    </Dialog>
                </InputBox>
                <InputBox>
                    <Button type="button" onClick={onSubmit}>회원가입</Button>
                </InputBox>
            </Form>
        </Wrapper>
    )
}

export default SignUpPresentational;