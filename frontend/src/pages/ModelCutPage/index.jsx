import { Button, Flex, FormControl, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { usePreviewImg } from '../../hooks/usePreviewImg'
import { useCreateCut } from '../../hooks/useCreateCut'

export default function ModelCutPage() {

    const [inputs, setInputs] = useState({
        name: "",
        price: ""
    })

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const fileRef = useRef(null)
    const { selectedFile, handleImageChange, setSelectedFile } = usePreviewImg();
    const { createCut, loading } = useCreateCut()

    const closeModal = () => {
        onClose()
        setSelectedFile('')
    }

    const handleCut = async () => {
        try {
            await createCut(inputs, selectedFile)
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Flex border={"1px solid gray"} m={5}>
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
            </Flex>

            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={closeModal}

            >
                <ModalOverlay />
                <ModalContent bg={"black"} border={"1px solid gray"}>
                    <ModalHeader textAlign={"center"}>Cadastrar modelo</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        pb={6}
                        display={"flex"}
                        flexDirection={"column"}
                        justifyContent={"center"}
                    >

                        <Image
                            src={selectedFile || ''}
                            w={"full"}
                            h={200}
                            objectFit='cover'
                            alt='Dan Abramov'
                            fallbackSrc='https://via.placeholder.com/100'
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
                            onClick={handleCut}
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