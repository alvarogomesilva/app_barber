import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useAuthStore } from '../store/useAuthStore';
import { useShowToast } from './useShowToast';

export const useSignUp = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)
    const loginUser = useAuthStore((state) => state.login)
    const showToast = useShowToast()

    const signup = async (inputs) => {
        const { barbershop, name, email, password } = inputs
        if (!barbershop || !name || !email || !password) {
            return showToast("Preencha todos os campos!", "error")
        }

        const barbersRef = collection(firestore, "barbers")
        const q = query(barbersRef, where("email", "==", email))
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return showToast("Email já existente!", "error")
        }

        if (password.length < 6) return showToast("Senha precisa ter no minimo 6 caracteres!", "error")

        try {
            const newUser = await createUserWithEmailAndPassword(email, password)

            if (!newUser && error) {
                alert('Houve algum erro')
                console.log(error)
                return;
            }

            if (newUser) {
                const userDoc = {
                    uid: newUser.user.uid,
                    barbershop: barbershop,
                    name: name,
                    email: email,
                    avatar: "",
                    address: "",
                    phoneNumber: "",
                    createdAt: Date.now(),
                };

                await setDoc(doc(firestore, "barbers", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc));
                loginUser(newUser)
                showToast("Seja bem-vindo!", "success")
            }
        } catch (error) {
            console.log(error)
        }

    }

    return { signup, loading }
}