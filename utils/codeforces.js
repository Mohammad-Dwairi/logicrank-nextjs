
// import sha512 from 'crypto-js/sha512';
//
// export const createApiRequestUrl = (endpoint, params) => {
//     const key = process.env.NEXT_PUBLIC_CODEFORCES_API_KEY;
//     const secret = process.env.NEXT_PUBLIC_CODEFORCES_API_SECRET;
//     const rand = Math.floor(Math.random() * 100000);
//     const paramsString = params.map(param => `${param.key}=${param.value}`).join('&');
//     const queryString = `apiKey=${key}&${paramsString}&time=${+new Date()}`
//     const sig = sha512(`${rand}/${endpoint}?${queryString}#${secret}`).toString();
//
//     console.log("RANDOM: ", rand);
//     console.log("PARAMS STRING: ", paramsString);
//     console.log("QUERY STRING: ", queryString);
//     console.log("HASH: ", sig);
//
//
//     return `https://codeforces.com/api/${endpoint}?${queryString}&apiSig=${rand}${sig}`;
// };
