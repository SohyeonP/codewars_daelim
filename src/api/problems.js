const API_URL = process.env.NODE_ENV === 'production'
    ? 'http://codewars-env.eba-fmrv6mpd.ap-northeast-2.elasticbeanstalk.com'
    :'http://localhost:8000/';

export const getProblemList = () =>{
    return fetch(`${API_URL}/problems`)
    .then(res => res.json());
   
};
export const postUserSoultion = (problemId,code)=>{
    return fetch(`http://localhost:8000/problems/${problemId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({code})
    }).then(res =>res.json());

}