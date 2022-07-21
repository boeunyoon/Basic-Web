import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import {registerUser} from '../../../_actions/user_action'
function RegisterPage() {

  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [Name, setName] = useState("")
  const [ConfirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEmailHandler = (e) =>{
    setEmail(e.currentTarget.value)
  }
  const onPasswordHandler = (e) =>{
    setPassword(e.currentTarget.value)
  }

  const onNameHandler = (e) =>{
    setName(e.currentTarget.value)
  }
  const onConfirmPasswordHandler = (e) =>{
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    if(Password !== ConfirmPassword){
      return alert('비밀번호와 비밀번호확인이 다릅니다')
    }
    let body = {
      email: Email,
      name: Name,
      password: Password,
    }
    dispatch(registerUser(body))
    //axios.post()
    .then(response => {
      if(response.payload.success){
        navigate('/login')
      }else{
        alert('Failed to Sign up')
      }
    })
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItem: 'center',
      width: '100%', height: '100vh'
    }}>

      <form style={{ display: 'flex', flexDirection: 'column'}}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>
        <label>Confirme Password</label>
        <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler}/>
        <br/>
        <button>
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default RegisterPage