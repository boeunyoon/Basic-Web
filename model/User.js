const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema)

module.exports = {User}