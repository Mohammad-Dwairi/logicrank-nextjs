import axios from 'axios';

export const registerNewUser = (username, secret) => {
    console.log(username, ' ', secret);

    axios.put(
        "https://api.chatengine.io/users/",
        {username, secret},
        {headers: {"Private-Key": "02e0a2f6-8bc8-4436-b5a6-88a2761d19d0"}}
    ).then((r) => {
        console.log(r)
    });

};