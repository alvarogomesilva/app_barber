import { Avatar, Box, Button, Flex, Image, Link, Tooltip } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"

import { BiLogOut } from 'react-icons/bi'
import { RxScissors } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { useLogout } from "../../hooks/useLogout";

export const SideBar = () => {
    const { handleLogout, isLoggingOut } = useLogout();

    const sidebarItems = [
        {
            icon: <MdDashboard size={25} />,
            text: "Dashboard",
            link: "/"
        },
        {
            icon: <RxScissors size={25} />,
            text: "Cortes"
        },

        {
            icon: <Avatar size={"sm"} name="Burak Orkmez" src="/profilepic.png" />,
            text: "Conta",
            link: "/asprogrammer"
        }
    ]

    return (
        <Box
            height={"100vh"}
            borderRight={"1px solid"}
            borderColor={"whiteAlpha.300"}
            py={8}
            position={"sticky"}
            top={0}
            left={0}
            px={{ base: 2, md: 4 }}
        >
            <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
                <Link to={"/"} as={RouterLink} pl={2} display={{ base: "none", md: "block" }} cursor={"pointer"}>
                    <Image src="/logo.svg" h={20} cursor={"pointer"} alt="Logo" />
                </Link>
                <Link to={"/"} as={RouterLink} pl={2} display={{ base: "block", md: "none" }}
                    cursor={"pointer"}
                    borderRadius={6}
                    p={2}
                    _hover={{
                        bg: "whiteAlpha.200"
                    }}
                    w={10}
                >
                    <Image src="/auth.png" h={6} cursor={"pointer"} alt="Logo" />
                </Link>
                <Flex direction={"column"} gap={5} cursor={"pointer"}>
                    {sidebarItems.map((item, index) => (
                        <Tooltip
                            key={index}
                            hasArrow={true}
                            label={item.text}
                            placement="right"
                            ml={1}
                            openDelay={500}
                            display={{ base: 'block', md: "none" }}
                        >
                            <Link
                                display={"flex"}
                                to={item.link || null}
                                as={RouterLink}
                                alignItems={"center"}
                                gap={4}
                                _hover={{ bg: "whiteAlpha.400" }}
                                borderRadius={6}
                                p={2}
                                w={{ base: 10, md: "full" }}
                                justifyContent={{ base: "center", md: "flex-start" }}
                            >
                                {item.icon}
                                <Box display={{ base: "none", md: "block" }}>
                                    {item.text}
                                </Box>
                            </Link>
                        </Tooltip>
                    ))}
                </Flex>
                <Tooltip

                    hasArrow={true}
                    label={'Logout'}
                    placement="right"
                    ml={1}
                    openDelay={500}
                    display={{ base: 'block', md: "none" }}
                >
                    <Flex
                        onClick={handleLogout}
						alignItems={"center"}
						gap={4}
						_hover={{ bg: "whiteAlpha.400" }}
						borderRadius={6}
						p={2}
						w={{ base: 10, md: "full" }}
						mt={"auto"}
						justifyContent={{ base: "center", md: "flex-start" }}
                    >
                        <BiLogOut size={25} />
                        <Button
                            display={{ base: "none", md: "block" }}
                            variant={"ghost"}
                            _hover={{ bg: "transparent" }}
                            isLoading={isLoggingOut}
                        >
                            Logout
                        </Button>
                    </Flex>
                </Tooltip>

            </Flex>
        </Box>
    )
}