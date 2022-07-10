const { User } = require('../model/User')

let auth = (req, res, next) => {
    //인증처리를 하는곳

    //클라이언트 쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;
    //토큰을 복호화 한후 유저를 찾는다
    User.findByToken(token, (err, user) => {
        
        if(err) throw err;
        if(!user) return res.json({isAuth: false, error : true})
        //토큰과 유저를 req에 넣어주면서 index auth에서 두정보를 사용할 수 있음
        req.token = token;
        req.user = user;
        next();
    })
    //유저가 있으면 Okay
    //유저가없으면 인증 No
}

module.exports = { auth };