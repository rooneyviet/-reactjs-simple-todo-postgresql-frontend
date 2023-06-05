import React, {useState, useContext} from "react";
import * as S from "./styles";
import Logo from "../../images/Logo.png";
import { Link } from "react-router-dom";


const Register = () =>{
    //const {setUserData} = useContext(AuthContext) as AuthType;
    const [username, setUsername] =  useState("");

    function handleRegister(){
        //localStorage.setItem('@Project:email', email);
        //setUserData({email})


    }

    

    function handleEmail(event: React.ChangeEvent<HTMLInputElement>){
        //setEmail(event.target.value)
    }

    return(    
        <S.Page>
            <S.LeftSide>
                <S.Img src={Logo}></S.Img>
            </S.LeftSide>
            <S.RightSide>
                <S.Title>Welcome to Tasker</S.Title>
                <S.Subtitle>Please, fill out registration form.</S.Subtitle>
                <S.FieldName >Username</S.FieldName>
                <S.InputField value={username} id="email" onChange={handleEmail} placeholder="Insert your username"></S.InputField>
                <S.FieldName>Password</S.FieldName>
                <S.InputField placeholder="Enter your password" type="password"></S.InputField>
                <S.FieldName>Confirm Password</S.FieldName>
                <S.InputField placeholder="Re-enter your password to confirm" type="password"></S.InputField>
                {/* <S.KeepSigned><S.Checkbox/><S.Subtitle>Remember me</S.Subtitle></S.KeepSigned> */}
                <Link to="/register">
                    <S.SignIn onClick={handleRegister}>Register</S.SignIn>
                </Link>
                
                <S.Subtitle>Already have an account? <Link to="/login"><a>Sign In</a></Link></S.Subtitle>
                
            </S.RightSide>
        </S.Page>
    )
};

export default Register;