import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { showMessage } from "react-native-flash-message";
import { firebaseAuth } from "../../config/firebase";
import AuthTemplateDefault from "../components/AuthTemplateDefault";

const LoginScreen = ({ navigation }) => {
	const [isLoading, setIsLoading] = useState(false);

	const navigateScreen = () => {
		navigation.navigate("register");
	};

	const action = async ({ email, password }, callback) => {
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(firebaseAuth, email, password);
			showMessage({
				message: "Usuario autenticado",
				type: "success",
			});
			callback();
			navigation.navigate("home");
		} catch (e) {
			showMessage({
				message: e.message,
				type: "danger",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<AuthTemplateDefault
			navigateScreen={navigateScreen}
			textButton="Iniciar sesión"
			textNavigate="Quiero registrarme"
			action={action}
			isLoading={isLoading}
		/>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
