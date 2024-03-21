import { Avatar, Button, Container, Flex, Grid, GridItem, Input, VStack } from "@chakra-ui/react";
import { useAuthStore } from '../../store/useAuthStore';
import { useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useEditProfile } from "../../hooks/useEditProfile";

export default function ProfilePage() {

    const authUser = useAuthStore((state) => state.user);
    const [inputs, setInputs] = useState({
        barbershop: authUser?.barbershop || "",
        name: authUser?.name || "",
        address: authUser?.address || "",
        phoneNumber: authUser?.phoneNumber || ""
    });

    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
    const fileRef = useRef(null);
    const { loading, editProfile } = useEditProfile();

    const handleEditProfile = async () => {
        try {
            await editProfile(inputs, selectedFile);
            setSelectedFile(null);
        } catch (error) {
            console.log(error);
            // Adicione feedback visual para o usuário aqui, se necessário
        }
    };

    return (
        <Flex
            minH={"100vh"}
            justifyContent={"center"}
            px={4}
        >
            <Container maxW={"550px"}
                maxH={"450px"}
                padding={5}
                my={10}
                border={"1px solid gray"}
                borderRadius={4}
            >
                <Flex direction={"column"} alignItems={"center"} gap={5} my={5}>
                    <Avatar size='2xl' bg='yellow.500' src={selectedFile || authUser?.avatar} />

                    <label htmlFor="fileInput">
                        <Input type="file" id="fileInput" hidden ref={fileRef} onChange={handleImageChange} />
                        <Button color="yellow.500" onClick={() => fileRef.current.click()}>Trocar foto</Button>
                    </label>
                </Flex>

                <VStack spacing={4}>
                    <Grid gridAutoColumns={"auto"} gap={4} w="full">


                        <GridItem w='100%'>
                            <Input
                                value={inputs.name}
                                onChange={(e) => setInputs(prevState => ({ ...prevState, name: e.target.value }))}
                                placeholder="Nome"
                                focusBorderColor="yellow.500"
                                fontSize={14}
                            />
                        </GridItem>
                        <GridItem w='100%'>
                            <Input
                                value={inputs.barbershop}
                                onChange={(e) => setInputs(prevState => ({ ...prevState, barbershop: e.target.value }))}
                                placeholder="Nome da Barbearia"
                                focusBorderColor="yellow.500"
                                fontSize={14}
                            />
                        </GridItem>
                        <GridItem w='100%'>
                            <Input
                                value={inputs.address}
                                onChange={(e) => setInputs(prevState => ({ ...prevState, address: e.target.value }))}
                                placeholder="Endereço"
                                focusBorderColor="yellow.500"
                                fontSize={14}
                            />
                        </GridItem>

                        <GridItem w='100%'>
                        <Input
                            value={inputs.phoneNumber}
                            onChange={(e) => setInputs(prevState => ({ ...prevState, phoneNumber: e.target.value }))}
                            placeholder="Telefone"
                            focusBorderColor="yellow.500"
                            fontSize={14}
                        />
                        </GridItem>

                        <GridItem w='100%' colSpan={2}>
                            <Button
                                w={"full"}
                                colorScheme='yellow'
                                size={"lg"}
                                fontSize={14}
                                isLoading={loading}
                                onClick={handleEditProfile}
                            >
                                Atualizar
                            </Button>
                        </GridItem>
                    </Grid>
                </VStack>
            </Container>
        </Flex>
    );
}
