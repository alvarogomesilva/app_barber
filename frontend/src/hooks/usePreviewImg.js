import { useState } from 'react'
import { useShowToast } from './useShowToast'

export const usePreviewImg = () => {
    const showToast = useShowToast()
    const [selectedFile, setSelectedFile] = useState(null)
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB

    const handleImageChange = (e) => {
        const file = e.target.files[0]

        if (file && file.type.startsWith("image/")) {
			if (file.size > maxFileSizeInBytes) {
				showToast("Arquivo maior que 2MB", "error");
				setSelectedFile(null);
				return;
			}
			const reader = new FileReader();

			reader.onloadend = () => {
				setSelectedFile(reader.result);
                
			};

			reader.readAsDataURL(file);
            
		} else {
			showToast("Por favor, selecione uma imagem!", "error");
			setSelectedFile(null);
		}
    }

    return { selectedFile, handleImageChange, setSelectedFile };
}