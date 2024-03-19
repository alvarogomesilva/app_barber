import { Box, Container, Flex, Image, VStack } from "@chakra-ui/react";
import { AuthForm } from "../../components/AuthForm";

export default function AuthPage() {
    return (
        <Flex minH={"100vh"} justifyContent={"center"} alignItems={"center"} px={4}>
            <Container maxW={"container.md"} padding={0}>
                <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
                    <Box display={{ base: "none", md: "block" }}>
                        <Image src="/auth.png" h={400} alt="Phone img" />
                    </Box>
                    <VStack spacing={4} align={"stretch"}>
                        <AuthForm />                        
                    </VStack>
                </Flex>
            </Container>
        </Flex>
    )
}