import { useState } from "react"
import { useShowToast } from '../useShowToast'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { firestore, storage } from "../../firebase/firebaseConfig";
import { useAuthStore } from '../../store/useAuthStore';

import { addDoc, collection } from "firebase/firestore";


export const useCreateModel = () => {
    const [loading, setLoading] = useState(false)
    const showToast = useShowToast()
    const authUser = useAuthStore((state) => state.user)


    const createModel = async (inputs, selectedFile) => {

        if (!selectedFile) return showToast("Selecione uma foto!", "error")
        if (!inputs.name || !inputs.price) {
            return showToast("Preencha todos os campos!", "error")
        }

        setLoading(true)
        const ramdomId = Math.floor(Math.random() * 1000000000000000000000)
        const storageRef = ref(storage, `banners/${ramdomId}`)
        let URL = "";



        try {
            await uploadString(storageRef, selectedFile, "data_url");
            URL = await getDownloadURL(ref(storage, `banners/${ramdomId}`));

            const newModel = {
                name: inputs.name,
                price: inputs.price,
                banner: URL,
                createdBy: authUser.uid,
                bannerId: ramdomId
            }

            await addDoc(collection(firestore, "models"), newModel)
            showToast("Adicionado com sucesso!", "success")

        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return { createModel, loading }
}