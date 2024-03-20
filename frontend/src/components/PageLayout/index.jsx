import { Box, Flex, Spinner } from "@chakra-ui/react";
import { SideBar } from "../Sidebar";
import { useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../../firebase/firebaseConfig';


export const PageLayoutSpinner = () => {
    return (
        <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
            <Spinner size='xl' />
        </Flex>
    );
};

export const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    const [user, loading] = useAuthState(auth);

    const canRenderSidebar = pathname !== '/auth' && user
    const checkingUserIsAuth = !user && loading;

    if (checkingUserIsAuth) return <PageLayoutSpinner />

    return (
        <Flex>
            {/* Se a Rota for diferente de /auth mostra a barra lateral */}
            {canRenderSidebar ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <SideBar />
                </Box>
            ) : null}
            {/* Mostra o tamanho da tela com base largura */}
            <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
                {children}
            </Box>
        </Flex>
    )
}