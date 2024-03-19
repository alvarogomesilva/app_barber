import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

const Signup = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Email'
                fontSize={14}
                type='email'
                size={"md"}
                value={inputs.email}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Username'
                fontSize={14}
                type='text'
                size={"md"}
                value={inputs.username}
                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
            <Input
                borderRadius={5}
                focusBorderColor="yellow.500"
                placeholder='Full Name'
                fontSize={14}
                type='text'
                size={"md"}
                value={inputs.fullName}
                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
            <InputGroup>
                <Input
                    focusBorderColor="yellow.500"
                    placeholder='Password'
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
            >
                Sign Up
            </Button>
        </>
    );
};

export default Signup;