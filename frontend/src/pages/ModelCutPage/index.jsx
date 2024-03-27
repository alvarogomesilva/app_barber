import { Box, Button, Divider, Flex, FormControl, Grid, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { usePreviewImg } from '../../hooks/usePreviewImg'
import { useCreateModel } from '../../hooks/models/useCreateModel'
import { CardModel } from '../../components/CardModel'
import { useGetModel } from '../../hooks/models/useGetModel'

export default function ModelCutPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [inputs, setInputs] = useState({
        name: "",
        price: ""
    })

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const fileRef = useRef(null)

    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
    const { createModel, loading } = useCreateModel()
    const { models } = useGetModel()

    const closeModal = () => {
        setSelectedFile(null)
        setInputs({
            name: "",
            price: ""
        })
        onClose()
    }

    const handleModel = async () => {
        try {
            await createModel(inputs, selectedFile)
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Flex m={5} direction={"column"}>
                <Flex p={5} alignItems={"center"} gap={5} >

                    <Text
                        fontSize={{ base: 'lg', md: '4xl' }}
                        color="yellow.500"
                    >
                        Modelos de Corte
                    </Text>
                    <Button
                        color="yellow.500"
                        onClick={onOpen}
                    >
                        Cadastrar novo
                    </Button>
                </Flex>
                <Divider />
                <Grid
                    gridTemplateColumns={{
                        md: "repeat(1, 1fr)",
                        lg: "repeat(2, 1fr)",
                        xl: "repeat(3, 1fr)"
                    }}
                    
                >

                    {models.map((model) => (

                        <CardModel model={model} key={model.id} />

                    ))}
                </Grid>
            </Flex>



            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={closeModal}

            >
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader />
                    <ModalCloseButton />
                    <ModalBody
                        pb={6}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >

                        <Image
                            src={selectedFile || null}
                            borderRadius={"lg"}
                            w={"full"}
                            h={200}
                            objectFit='cover'
                            fallbackSrc='https://via.placeholder.com/150'
                            alt='Banner'
                            alignSelf={"center"}
                            mb={4}
                        />

                        <Input type="file" id="fileInput" hidden ref={fileRef} onChange={handleImageChange} />


                        <Button
                            color="yellow.500"
                            mb={4}
                            width={200}
                            alignSelf={"center"}
                            onClick={() => fileRef.current.click()}
                        >Adicionar Banner</Button>


                        <FormControl>
                            <Input
                                value={inputs.name}
                                onChange={(e) => setInputs(prevState => ({ ...prevState, name: e.target.value }))}
                                ref={initialRef} placeholder='Nome do corte'
                                focusBorderColor="yellow.500"
                                fontSize={14} />
                        </FormControl>

                        <FormControl mt={4}>
                            <Input
                                value={inputs.price}
                                onChange={(e) => setInputs(prevState => ({ ...prevState, price: e.target.value }))}
                                placeholder='Preço exemplo: 45,90'
                                focusBorderColor="yellow.500"
                                fontSize={14} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            size={"lg"}
                            colorScheme='yellow'
                            w={"full"}
                            onClick={handleModel}
                            isLoading={loading}
                        >
                            Cadastrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}