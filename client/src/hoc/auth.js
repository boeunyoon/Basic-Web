import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { auth } from '../_actions/user_action'
import { useNavigate } from 'react-router-dom';
export default function (SpecificComponent, option, adminRoute = null){
     
    function AuthenticationCheck(props){
        const navigate = useNavigate();
        const dispatch = useDispatch();

        useEffect(()=>{
            dispatch(auth()).then(response => {
                console.log(response)
                //로그인 안한 상태
                if(!response.payload.isAuth){
                    if(option){
                        navigate('/login')
                    }
                }else{
                    //로그인 한 상태
                    if(adminRoute && !response.payload.isAuth){
                        navigate('/')
                    }else{
                        if(option === false){
                            navigate('/')
                        }
                    }
                }
                
            })
            axios.get('/api/users/auth')
        },[])
        return(
            <SpecificComponent {...props}/>
        )
    }
    return <AuthenticationCheck/>;
}