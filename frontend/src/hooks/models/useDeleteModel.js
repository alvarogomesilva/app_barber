import { doc, deleteDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebaseConfig";
import { ref, deleteObject } from "firebase/storage";
export const useDeleteModel = () => {

    const deleteModel = async (id, banner) => {

        await deleteObject(ref(storage, `banners/${banner}`))
        await deleteDoc(doc(firestore, "models", id));
    }

    return { deleteModel }
}