const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { User } = require("./model/User");
//application/x-www-form-urlcoded 이런형식을 분석해서 가져온다
app.use(bodyParser.urlencoded({extended: true}));
//application/json 이런형식을 분석해서 가져온다
app.use(bodyParser.json());
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://yboeun:dbsqhdms00@cluster0.9ocle.mongodb.net/basic-web?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))
app.get('/', (req, res) => {
  res.send('Hello World! HI')
})
app.post('/register', (req, res) => {
  //회원가입시 필요한 정보들을 client에서 가져오면 그것들을 데이터베이스에 저장한다
  //body-parser를 이용해서 req. body를 통해 클라이언트에서 정보를 가져온다
  const user = new User(req.body)

  user.save((err,doc) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다
  User.findOne({email: req.body.email}, (err,user) => {
    if(!user){
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
//요청된 이메일이 데이테베이스에 있다면 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다"})
      //비밀번호까지 맞다면 토큰을 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        //토큰을 쿠키에 저장한다
        res.cookie("x_auth", user.token)
        .status(200)
        .json({loginSuccess: true, userId: user._id})
      })
    })
  })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})