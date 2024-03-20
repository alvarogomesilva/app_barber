import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useShowToast = () => {
	const toast = useToast();

	const showToast = useCallback(
		(description, status) => {
			toast({
				description: description,
				status: status,
				duration: 1500,
				isClosable: true,
                position: "top"
			});
		},
		[toast]
	);

	return showToast;
};
