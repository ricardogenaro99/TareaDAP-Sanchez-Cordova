import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Loader from "react-native-modal-loader";
import ButtonGlobal from "../shared/components/ButtonGlobal";
import CardGlobal from "../shared/components/CardGlobal";
import InputGlobal from "../shared/components/InputGlobal";
import { colorPrimary } from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialForm = {
	email: "",
	password: "",
};
const AuthTemplateDefault = ({
	navigateScreen,
	textButton,
	textNavigate,
	action,
	isLoading = false,
}) => {
	const [form, setForm] = useState(initialForm);

	const resetForm = () => setForm(initialForm);

	const handlePressNavigate = () => {
		resetForm();
		navigateScreen();
	};

	const handlePress = async () => {
		if (isValid()) {
			console.log(form);
			await action(form, resetForm);
		}
	};

	const isValid = () => {
		return !(
			form.email.trim().length === 0 || form.password.trim().length === 0
		);
	};

	return (
		<View style={styles.container}>
			<Loader loading={isLoading} color={colorPrimary} />
			<CardGlobal>
				<InputGlobal
					value={form.email}
					handleChange={(value) => setForm({ ...form, email: value })}
					placeholder="ejemplo@correo.xyz"
				/>
				<InputGlobal
					value={form.password}
					handleChange={(value) => setForm({ ...form, password: value })}
					secureTextEntry={true}
					placeholder="*******************"
				/>
				<ButtonGlobal text={textButton} handlePress={handlePress} />
				<Text style={styles.text} onPress={handlePressNavigate}>
					{textNavigate}
				</Text>
			</CardGlobal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...screenSheet,
		justifyContent: "center",
	},
	text: {
		color: colorPrimary,
		textAlign: "center",
		fontWeight: "bold",
		margin: 3,
	},
});

export default AuthTemplateDefault;
