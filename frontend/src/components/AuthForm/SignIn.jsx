
import { Alert, AlertIcon, Button, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useSignIn } from '../../hooks/useSignIn';

export const SignIn = () => {
	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const { signin, loading, error } = useSignIn()
	
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
			{error && (
				<Alert status='error' fontSize={13} p={2} borderRadius={4}>
					<AlertIcon fontSize={12} />
					<Text>Email/Senha incorretos!</Text>
				</Alert>
			)}

			<Button
				w={"full"}
				colorScheme='yellow'
				size={"md"}
				fontSize={14}
				isLoading={loading}
				onClick={() => signin(inputs)}
			>
				Log in
			</Button>
		</>
	);
};
