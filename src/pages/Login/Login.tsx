import React, {useState, useContext} from "react";
import * as S from "./styles";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";
import userApi from "../../api/service/user.api";
import { useDispatch } from "react-redux";
import { setAccessToken, setLogin } from "../../redux/features/userSlice";


const Login = () =>{
    const dispatch = useDispatch();
    //const {setUserData} = useContext(AuthContext) as AuthType;
    const [username, setUsername] =  useState("");
    const [password, setPassword] =  useState("");
    const [errMessage, setErrMessage] = useState("");

    async function handleLogin(){
        //localStorage.setItem('@Project:email', email);
        //setUserData({email})
        const { response, err } = await userApi.signin({username, password});
        
        if(response) {
            setErrMessage("");
            console.log(response);
            setUsername("");
            setPassword("");
            console.log(response.data.accessToken);
            dispatch(setLogin(response.data.user));
            dispatch(setAccessToken(response.data.accessToken));
        }

        if(err) {
            console.log(err);
            setErrMessage("Invalid username or password. Please try again");
        }
    }

    
    function handleUsername(event: React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value)
    }

    function handlePassword(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    return(    
        <S.Page>
            <S.LeftSide>
                <S.Img src={Logo}></S.Img>
            </S.LeftSide>
            <S.RightSide>
                <S.Title>Welcome to Tasker</S.Title>
                <S.Subtitle>Fill out login information.</S.Subtitle>
                <S.FieldName >Username</S.FieldName>
                <S.InputField value={username} id="email" onChange={handleUsername} placeholder="Insert your username"></S.InputField>
                <S.FieldName>Password</S.FieldName>
                <S.InputField value={password} id="email" onChange={handlePassword} placeholder="Insert your password" type="password"></S.InputField>
                <S.KeepSigned><S.Checkbox/><S.Subtitle>Remember me</S.Subtitle></S.KeepSigned>
                <p style={{color: "red"}}>{errMessage}</p>
                <Link to="/">
                    <S.SignIn onClick={handleLogin}>Sign In</S.SignIn>
                </Link>
                <S.Subtitle>Don't have an account? <Link to="/register"><a>Sign Up</a></Link></S.Subtitle>
            </S.RightSide>
        </S.Page>
    )
};

export default Login;