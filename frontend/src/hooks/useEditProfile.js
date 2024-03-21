import { useState } from 'react';
import {useAuthStore} from '../store/useAuthStore';
import {useShowToast} from './useShowToast';
import {firestore, storage} from '../firebase/firebaseConfig'
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';

export const useEditProfile = () => {

    const [loading, setLoading] = useState(false);
    const authUser = useAuthStore((state) => state.user);
	const setAuthUser = useAuthStore((state) => state.setUser);
    const showToast = useShowToast()

    const editProfile = async (inputs, selectedFile) => {
        if (loading || !authUser) return;
		setLoading(true);

        const storageRef = ref(storage, `avatars/${authUser.uid}`)
        const userDocRef = doc(firestore, "barbers", authUser.uid)

        let URL = "";

        try {
            if (selectedFile) {
				await uploadString(storageRef, selectedFile, "data_url");
				URL = await getDownloadURL(ref(storage, `avatars/${authUser.uid}`));
			}

            const updatedUser = {
				...authUser,
                name: inputs.name || authUser.name,
				barbershop: inputs.barbershop || authUser.barbershop,
				address: inputs.address || authUser.address,
				phoneNumber: inputs.phoneNumber || authUser.phoneNumber,
				avatar: URL || authUser.avatar,
			};

            await updateDoc(userDocRef, updatedUser);
			localStorage.setItem("user-info", JSON.stringify(updatedUser));
			setAuthUser(updatedUser);
			setLoading(false)
			showToast("Perfil Atualizado!", "success");

        } catch (error) {
            console.log(error)
        }

    }

    return { editProfile, loading }
}