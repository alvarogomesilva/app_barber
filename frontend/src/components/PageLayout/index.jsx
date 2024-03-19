import { Box, Flex, Spinner } from "@chakra-ui/react"
import { SideBar } from "../Sidebar"
import { useLocation } from "react-router-dom"


export const PageLayoutSpinner = () => {
	return (
		<Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
			<Spinner size='xl' />
		</Flex>
	);
};

export const PageLayout = ({ children }) => {
    const { pathname } = useLocation()
    return (
        <Flex>
            {/* Se a Rota for diferente de /auth mostra a barra lateral */}
            {pathname !== '/auth' ? (
                <Box w={{ base: "70px", md: "240px" }}>
                    <SideBar />
                </Box>
            ) : null}
            {/* Mostra o tamanho da tela com base largura */}
            <Box flex={1} w={{base: "calc(100% - 70px)", md: "calc(100% - 240px)"}}>
                {children}
            </Box>
        </Flex>
    )
}