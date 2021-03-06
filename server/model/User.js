const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true, //빈칸을 없애주는 역할
        unique: 1 // 같은 이메일을 쓰지 못한다
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number //토큰의 유효기간
    }
})

userSchema.pre('save', function(next){
    var user = this;

    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다
      bcrypt.genSalt(saltRounds, function(err, salt) {
          if(err) return next(err)
  
          bcrypt.hash(user.password, salt, function(err, hash) {
              // Store hash in your password DB.
              if(err) return next(err)
              user.password = hash
              next()
          });
      });
    }else{
        next()
    }
})
userSchema.methods.comparePassword = function(plainPassword, cb){
    //plainPassword 1234567
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user = this;
    //jsonwebtoken을 이용하여 token을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;
    
    //토큰을 디코드(해독)한다.
    jwt.verify(token, 'secretToken', function(err, decode){
        //유저 아이디를 이용해서 유저를 찾은후 
        //클라이언트에서 가져온 토큰과 데이터베이스에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id": decode, "token": token}, (err, user) => {
            if(err) return cb(err);
            cb(null, user);
        })
    })
}
const User = mongoose.model('User', userSchema)

module.exports = {User}