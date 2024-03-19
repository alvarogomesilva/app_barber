import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

import { useSignUp } from '../../hooks/useSignUp';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputs, setInputs] = useState({
        barbershop: "",
        name: "",
        email: "",
        password: "",
    });

    const { signup, loading } = useSignUp()

    return (
        <>
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Nome da barbearia'
                fontSize={14}
                type='email'
                size={"md"}
                value={inputs.barbershop}
                onChange={(e) => setInputs({ ...inputs, barbershop: e.target.value })}
            />
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Seu nome'
                fontSize={14}
                type='text'
                size={"md"}
                value={inputs.name}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Seu email'
                fontSize={14}
                type='text'
                size={"md"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <InputGroup>
                <Input
                    focusBorderColor="yellow.500"
                    placeholder='Sua senha'
                    fontSize={14}
                    type={showPassword ? "text" : "password"}
                    value={inputs.password}
                    size={"md"}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <InputRightElement h='full'>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                </InputRightElement>
            </InputGroup>

            <Button
                w={"full"}
                colorScheme='yellow'
                size={"md"}
                fontSize={14}
                isLoading={loading}
                onClick={() => signup(inputs)}
            >
                Sign Up
            </Button>
        </>
    );
};

export default Signup;