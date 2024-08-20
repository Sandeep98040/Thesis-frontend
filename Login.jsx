import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #eef2f5;
`;

const FormWrapper = styled.div`
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
    color: #4CAF50;
`;

const Subtitle = styled.p`
    text-align: center;
    margin-bottom: 20px;
    font-size: 14px;
    color: #777;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #45a049;
    }
`;

const ErrorMessage = styled.p`
    color: red;
    font-size: 14px;
    text-align: center;
`;

const AIMessage = styled.div`
    background-color: #f0f8ff;
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
    font-size: 14px;
    text-align: center;
    color: #333;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Both fields are required.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            navigate('/courses');
        } catch (error) {
            console.error(error);
            setError('Invalid username or password.');
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Login to Your LMS</Title>
                <Subtitle>Empowered by AI to Enhance Your Learning</Subtitle>
                <AIMessage>
                    Our AI-driven platform provides personalized learning experiences. Log in to discover how AI can help you achieve your academic goals.
                </AIMessage>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    {error && <ErrorMessage>{error}</ErrorMessage>}
                    <Button type="submit">Login</Button>
                </form>
            </FormWrapper>
        </Container>
    );
};

export default Login;
