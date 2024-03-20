import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';
import { doc, getDoc } from 'firebase/firestore';
import {useShowToast} from './useShowToast';


export const useSignIn = () => {
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
    const showToast = useShowToast()


    const signin = async (inputs) => {
        const { email, password } = inputs
        if (!email || !password) {
            return showToast("Preencha todos os campos!", "error")
        }

        try {
            const userCred = await signInWithEmailAndPassword(email, password)

            if (userCred) {
                const docRef = doc(firestore, "barbers", userCred.user.uid);
                const docSnap = await getDoc(docRef);
                localStorage.setItem("user-info", JSON.stringify(docSnap.data()));
                loginUser(docSnap.data());
                showToast("Seja bem-vindo!", "success")
            }

        } catch (error) {
            return null
        }
    }

    return { signin, loading, error }
}