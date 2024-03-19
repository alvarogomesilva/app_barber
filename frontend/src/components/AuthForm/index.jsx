import { Box, Flex, Image, VStack } from "@chakra-ui/react"
import { useState } from "react"
import Signup from "./SignUp"
import { SignIn } from "./SignIn"

export const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <>
            <Box border={"1px solid gray"} borderRadius={4} padding={5}>
                <VStack spacing={4}>
                    <Image src="/logo.svg" h={20} cursor={"pointer"} alt="Logo" />

                    {isLogin ? <SignIn /> : <Signup />}


                </VStack>
                <Box padding={5}>
                    <Flex alignItems={"center"} justifyContent={"center"} >
                        <Box mx={2} fontSize={14}>
                            {isLogin ? "Dont' have an account?" : "Alredy have an account?"}
                        </Box>
                        <Box onClick={() => setIsLogin(!isLogin)} color={"yellow.500"} cursor={"pointer"}>
                            {isLogin ? "Sign Up" : "Log in"}
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}