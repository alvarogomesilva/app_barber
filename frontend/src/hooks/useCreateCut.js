import { useState } from 'react';
import {useShowToast} from './useShowToast';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth, firestore, storage } from '../firebase/firebaseConfig';
import {useAuthStore} from '../store/useAuthStore';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

export const useCreateCut = () => {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(false)
    const authUser = useAuthStore((state) => state.user)

    const createCut = async (inputs, selectedFile) => {
        

        if (!selectedFile) return showToast("Selecione um banner!", "error")
        if (!inputs.name || !inputs.price) {
            return showToast("Preencha todos os campo!", "error")
        }

        setLoading(true)
        const ramdomId = Math.floor(Math.random() * 1000000000000000000)
        const storageRef = ref(storage, `banners/${ramdomId}`)
        //const bannerDocRef =  ref(firestore, `haircuts/${authUser.uid}`)
        let URL = "";
        
        try {
            
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `banners/${ramdomId}`));

                
            const newHairCut = {
                name: inputs.name,
                price: inputs.price,
                banner: URL,
                barberId: authUser.uid
            }

            await addDoc(collection(firestore, `haircuts`), newHairCut)
            showToast("Adicionado com sucesso!", "success")

        } catch (error) {
            console.log(error)
        }

        finally {
            setLoading(false)
        }
    }

    return { createCut, loading }
}