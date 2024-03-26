import { deleteObject, getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useShowToast } from '../useShowToast'
import { doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from '../../firebase/firebaseConfig';
import { useState } from 'react';

export const useUpdateModel = () => {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false)

    const updateModel = async (id, inputs, selectedFile) => {

        if (!inputs.name || !inputs.price) return showToast("Preencha todos os campos!", "error")

        const ramdomId = Math.floor(Math.random() * 1000000000000000000000)
        const storageRef = ref(storage, `banners/${ramdomId}`)
        let URL = ""
        let model = {}
        try {
            setLoading(true)
            if (selectedFile) {

                await deleteObject(ref(storage, `banners/${inputs.banner}`))
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `banners/${ramdomId}`));
                model = {
                    name: inputs.name,
                    price: inputs.price,
                    banner: URL,
                    bannerId: ramdomId
                }

            } else {
                model = {
                    name: inputs.name,
                    price: inputs.price,
                }
            }
            const docRef = doc(firestore, `models/${id}`)
            await updateDoc(docRef, model)

            showToast("Atualizado com sucesso!", "success")
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }


    return { updateModel, loading }
}
