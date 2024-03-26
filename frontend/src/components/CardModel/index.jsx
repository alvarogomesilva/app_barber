import { Button, Card, CardBody, Flex, FormControl, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from "@chakra-ui/react";

import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useDeleteModel } from '../../hooks/models/useDeleteModel'
import { useRef, useState } from "react";
import { usePreviewImg } from "../../hooks/usePreviewImg";
import { useUpdateModel } from "../../hooks/models/useUpdateModel";

export const CardModel = ({ model }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { selectedFile, setSelectedFile, handleImageChange } = usePreviewImg()
    const { loading, updateModel } = useUpdateModel()
    const { deleteModel } = useDeleteModel()
    const [inputs, setInputs] = useState({
        name: model.name,
        price: model.price,
        banner: model.bannerId
    })

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const fileRef = useRef(null)

    const closeModal = () => onClose()

    const handleDelete = async () => await deleteModel(model.id, model.bannerId)

    const hanleUpdate = async () => {
        await updateModel(model.id, inputs, selectedFile)
        closeModal()
    }

    return (
        <>
            <Card maxW='sm'>
                <CardBody bg={"black"}>
                    <Flex
                        opacity={0}
                        _hover={{ opacity: 1 }}
                        position={"absolute"}
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg={"blackAlpha.700"}
                        transition={"all 0.3s ease"}
                        zIndex={1}
                        justifyContent={"center"}
                    >
                        <Flex alignItems={"center"} justifyContent={"center"} gap={10}>
                            <Button onClick={() => onOpen()}>
                                <MdEdit size={25} />
                            </Button>
                            <Button onClick={handleDelete}>
                                <IoMdTrash size={25} />
                            </Button>
                        </Flex>
                    </Flex>

                    <Image
                        objectFit={"cover"}
                        src={model.banner}
                        alt='Green double couch with wooden legs'
                        borderRadius='lg'
                    />
                    <Flex mt='6' spacing='3' justifyContent={"space-between"} alignItems={"baseline"}>
                        <Heading size='md'>{model.name}</Heading>
                        <Text color='yellow.500' fontSize='2xl'>
                            ${model.price}
                        </Text>
                    </Flex>
                </CardBody>
            </Card>

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
                            src={selectedFile || model.banner}
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
                            onClick={hanleUpdate}
                            isLoading={loading}
                        >
                            Atualizar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}