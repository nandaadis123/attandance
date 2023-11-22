import React, { useState } from "react";
import axios from 'axios';
import { API_URL } from "../../helper";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box ,Input ,Text,Button} from "@chakra-ui/react";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        username: username,
        password: password,
      });

      // Token yang diterima dari server
      const token = response.data.result.token;
      const role = response.data.result.role;

      // Simpan token ke local storage atau state global
      // Anda dapat menggunakan state management library seperti Redux untuk menyimpan token secara global
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      
      if (role === 'HR'){
        navigate('/EmployeeData')
      }else{
        navigate('/dashboardUser')
      }

      // Lakukan sesuatu setelah berhasil login, misalnya redirect atau perbarui state aplikasi
      console.log("Login berhasil");

    } catch (error) {
      console.error("Login gagal", error);
    }
  };

  return (<Box>
    <Box boxShadow={'xl'} textAlign={'center'} justifyContent={'center'} w={'30rem'} h={'25rem'} marginTop={'25%'} border={'1px solid gray'} borderRadius={'10'}>
      <Text fontSize={'25px'} marginTop={5}>Form Login</Text>
      <Box >
        <Box  marginBottom={10} marginTop={5}>
          Username:
          <Input
            marginTop={5}
            w={'90%'}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Box>
        <Box/>
        <Box marginBottom={10}>
          Password:
          <Input
            marginTop={5}
            w={'90%'}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Text/>
        <Button type="button" onClick={handleLogin}  w={'90%'} bg={'blue.100'} >
          Login
        </Button>
      </Box>
    </Box>
    </Box>
  );
};

export default Auth;
