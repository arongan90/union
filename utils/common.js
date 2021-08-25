export const chkValidPassword = (value) => {
    let pw = value; //비밀번호

    let pattern1 = /[0-9]/;
    let pattern2 = /[a-zA-Z]/;
    let pattern3 = /[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]/; // 원하는 특수문자 추가 제거
    let pw_msg = "";

    let rtnValue = {ok: false, msg: ''};

    if (pw.length === 0) {
        return {ok: false, msg: '비밀번호를 입력해주세요.'};
    }

    if (!pattern1.test(pw) || !pattern2.test(pw) || pw.length < 8 || pw.length > 50) {
        return {ok: false, msg: '영문+숫자 8자리 이상으로 구성하여야 합니다.'};
    } else {
        rtnValue = {ok: true, msg: '사용 가능한 비밀번호입니다.'};
    }

    let SamePass_0 = 0; //동일문자 카운트
    let SamePass_1 = 0; //연속성(+) 카운드
    let SamePass_2 = 0; //연속성(-) 카운드

    for (let i = 0; i < pw.length; i++) {
        let chr_pass_0;
        let chr_pass_1;
        let chr_pass_2;

        if (i >= 2) {
            chr_pass_0 = pw.charCodeAt(i - 2);
            chr_pass_1 = pw.charCodeAt(i - 1);
            chr_pass_2 = pw.charCodeAt(i);

            //동일문자 카운트
            if ((chr_pass_0 === chr_pass_1) && (chr_pass_1 === chr_pass_2)) {
                SamePass_0++;
            } else {
                SamePass_0 = 0;
            }

            //연속성(+) 카운드
            if (chr_pass_0 - chr_pass_1 === 1
                && chr_pass_1 - chr_pass_2 === 1) {
                SamePass_1++;
            } else {
                SamePass_1 = 0;
            }

            //연속성(-) 카운드
            if (chr_pass_0 - chr_pass_1 === -1
                && chr_pass_1 - chr_pass_2 === -1) {
                SamePass_2++;
            } else {
                SamePass_2 = 0;
            }
        }

        if (SamePass_0 > 0) {
            return {ok: false, msg: '동일문자를 3자 이상 연속 입력할 수 없습니다.'};
        }

        if (SamePass_1 > 0 || SamePass_2 > 0) {
            return {ok: false, msg: '영문, 숫자는 3자 이상 연속 입력할 수 없습니다.'};
        }
    }
    return rtnValue;
}

export const isEmail = email => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return emailRegex.test(email);
}

export const levenshteinenator = function(a, b) {
    let cost;

    // get values
    let m = a.length;
    let n = b.length;

    // make sure a.length >= b.length to use O(min(n,m)) space, whatever that is
    if (m < n) {
        let c=a;a=b;b=c;
        let o=m;m=n;n=o;
    }

    let r = new Array();
    r[0] = new Array();
    for (let c = 0; c < n+1; c++) {
        r[0][c] = c;
    }

    for (let i = 1; i < m+1; i++) {
        r[i] = new Array();
        r[i][0] = i;
        for (let j = 1; j < n+1; j++) {
            cost = (a.charAt(i-1) === b.charAt(j-1))? 0: 1;
            r[i][j] = minimator(r[i-1][j]+1,r[i][j-1]+1,r[i-1][j-1]+cost);
        }
    }

    return r[m][n];
}

export const onInputChange = (e, validate, data, setData, setValidate) => {
    let newValidate = { ...validate };
    if (e.target.value.length > 0) {
        let tmp = { ...data };
        tmp.snsUrl = e.target.value;
        newValidate.snsUrl = true;
        setData(tmp);
    } else {
        newValidate.snsUrl = false;
    }
    setValidate(newValidate);
}

// return the smallest of the three values passed in
const minimator = function(x,y,z) {
    if (x < y && x < z) return x;
    if (y < x && y < z) return y;
    return z;
}

