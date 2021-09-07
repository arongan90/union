// const prod = {
//     chatServer: {
//         PROTOCOL: 'https://',
//         URL: 'api.union.catbellcompany.com',
//     }
// };

const prod = {
    chatServer: {
        PROTOCOL: 'http://',
        URL: 'union.dev.catbellcompany.com:5050',
    }
};

const dev = {
    chatServer: {
        PROTOCOL: 'http://',
        // URL: '127.0.0.1:5050',
        URL: '172.16.1.192:5050',
    }
};

export const config = process.env.NODE_ENV === 'development' ? dev : prod;
