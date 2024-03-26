import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useModelStore } from '../../store/useModelStore';
import { useAuthStore } from '../../store/useAuthStore';
import { firestore } from "../../firebase/firebaseConfig";
import { useEffect, useState } from "react";

export const useGetModel = () => {
    
    const { models, setModels } = useModelStore();
    const authUser = useAuthStore((state) => state.user);

    useEffect(() => {
        
        const unsubscribe = onSnapshot(query(collection(firestore, "models"), where("createdBy", "==", authUser.uid)), (snapshot) => {
            const tempModels = [];
            snapshot.forEach((doc) => {
                tempModels.push({ ...doc.data(), id: doc.id });
                
            });
            setModels(tempModels);
           
        });

        
        return () => unsubscribe();
    }, []); 

    return { models };
};
