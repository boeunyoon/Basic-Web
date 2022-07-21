import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function LandingPage() {
  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  },[])
  const navigate = useNavigate()
  const onClickHandler = () => {
    axios.get(`/api/users/logout`)
         .then(response => {
          if(response.data.success){
            navigate('/login')
          }
         })
  }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItem: 'center',
      width: '100%', height: '100vh'
    }}>
      <h2>시작페이지</h2>
      <button onClick={onClickHandler}>
        Logout
      </button>
    </div>
  )
}

export default LandingPage