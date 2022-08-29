import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardGlobal from "../shared/components/CardGlobal";
import { fontSizeGlobal, marginVertical_S } from "../shared/utils/constValues";

const RestaurantCard = ({ restaurant, navigation }) => {
	const { name, address, restaurant_id } = restaurant;

	const handlePress = () => {
		navigation.navigate("restaurant", { restaurant_id });
	};

	return (
		<View style={styles.container}>
			<CardGlobal onPress={handlePress} width="100%">
				<Text style={styles.text}>Id: {restaurant_id}</Text>
				<Text style={styles.text}>Nombre: {name}</Text>
				<Text style={styles.text}>
					Dirección: {`${address?.street}, ${address?.building}`}
				</Text>
			</CardGlobal>
		</View>
	);
};

export default RestaurantCard;

const styles = StyleSheet.create({
	container: {
		marginVertical: marginVertical_S,
	},
	text: {
		fontSize: fontSizeGlobal,
	},
});
