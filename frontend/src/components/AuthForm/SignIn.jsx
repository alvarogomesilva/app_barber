
import { Button, Input } from "@chakra-ui/react";
import { useState } from "react";
//import useLogin from "../../hooks/useLogin";

export const SignIn = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	//const { loading, error, login } = useLogin();
	return (
		<>
			<Input
                borderRadius={5}
                focusBorderColor="yellow.500"
				placeholder='Email'
				fontSize={14}
				type='email'
				size={"md"}
				value={inputs.email}
				onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
			/>
			<Input
                borderRadius={5}
                focusBorderColor="yellow.500"
				placeholder='Password'
				fontSize={14}
				size={"md"}
				type='password'
				value={inputs.password}
				onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
			/>
			
			<Button
				w={"full"}
				colorScheme='yellow'
				size={"md"}
				fontSize={14}
			>
				Log in
			</Button>
		</>
	);
};
