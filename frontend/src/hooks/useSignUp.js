import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebaseConfig';
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { toast } from 'react-toastify'
export const useSignUp = () => {
    const [createUserWithEmailAndPassword, , loading, error] = useCreateUserWithEmailAndPassword(auth)

    const signup = async (inputs) => {
        const { barbershop, name, email, password } = inputs
        if (!barbershop || !name || !email || !password) {
            return toast.error("Preencha todos os campos!");
        }

        const barbersRef = collection(firestore, "barbers")
        const q = query(barbersRef, where("email", "==", email))
        const querySnapshot = await getDocs(q); 

        if (!querySnapshot.empty) {
            return toast.error('Email já existente!')
        } 

        if (password.length < 6) return toast.error('A senha precisa ter pelo menos 6 caracteres!')

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

                toast.success("Cadastrado com sucesso!");
            }
        } catch (error) {
            console.log(error)
        }

    }

    return { signup, loading }
}