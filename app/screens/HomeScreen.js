import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";
import SelectDropdown from "react-native-select-dropdown";
import CuisinesList from "../components/CuisinesList";
import RestaurantsList from "../components/RestaurantsList";
import DATA from "../data/restaurants.json";
import ButtonGlobal from "../shared/components/ButtonGlobal";
import InputSearchGlobal from "../shared/components/InputSearchGlobal";
import {
	borderRadiusGlobal,
	colorPrimary,
	colorWhite,
	fontSizeGlobal,
	marginVertical_M,
	marginVertical_S,
	minHeigthGlobal
} from "../shared/utils/constValues";
import { screenSheet } from "../shared/utils/sheets";

const initialSelect = {
	borough: "",
	cuisine: "",
};
const HomeScreen = ({ navigation }) => {
	const [boroughs, setBoroughs] = useState([]);
	const [cuisines, setCuisines] = useState([]);
	const [select, setSelect] = useState(initialSelect);
	const [searchId, setSearchId] = useState("");

	const [count, setCount] = useState(0);

	const cuisinesDropdownRef = useRef();

	useEffect(() => {
		const allBoroughs = DATA.map((e) => e.borough);
		const depuratedBoroughs = allBoroughs.filter((item, index) => {
			return allBoroughs.indexOf(item) === index;
		});
		setBoroughs(depuratedBoroughs);
	}, []);

	useEffect(() => {
		if (select.borough) {
			const resBoroughFilter = DATA.filter((e) => e.borough === select.borough);
			const cuisinesDrop = new Set(resBoroughFilter.map((e) => e.cuisine));

			if (select.cuisine) {
				const resCuisineFilter = resBoroughFilter.filter(
					(e) => e.cuisine === select.cuisine,
				);
				setCount(resCuisineFilter.length);
				return;
			}

			cuisinesDropdownRef.current.reset();
			setCuisines([...cuisinesDrop]);
			setCount(resBoroughFilter.length);
		}
	}, [select]);

	const handleSearch = () => {
		if (searchId.trim().length !== 0) {
			const pos = DATA.findIndex((e) => e.restaurant_id === searchId);

			if (pos === -1) {
				showMessage({
					message: "No se encontro un restaurante con este Id",
					type: "danger",
				});
				return;
			}
			navigation.navigate("restaurant", { restaurant_id: searchId });
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.containerSearch}>
				<InputSearchGlobal
					value={searchId}
					handleChange={setSearchId}
					width="72%"
					placeholder="Buscar por Id"
				/>
				<ButtonGlobal text="Buscar" width="25%" handlePress={handleSearch} />
			</View>
			<Text style={{ ...styles.text, fontWeight: "bold" }}>
				-------------------- o --------------------
			</Text>
			<SelectDropdown
				buttonStyle={styles.button}
				defaultButtonText="Selecciona un Barrio"
				data={boroughs}
				onSelect={(value) => {
					setSelect({ ...initialSelect, borough: value });
				}}
			/>
			<SelectDropdown
				ref={cuisinesDropdownRef}
				buttonStyle={styles.button}
				defaultButtonText="Selecciona un tipo de Cocina"
				data={cuisines}
				onSelect={(value) => {
					setSelect({ ...select, cuisine: value });
				}}
			/>
			<Text style={styles.text}>
				Se encontraron {count} restaurantes en total
			</Text>
			{!select.cuisine ? (
				<CuisinesList filters={select} navigation={navigation} />
			) : (
				<RestaurantsList filters={select} navigation={navigation} />
			)}
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		...screenSheet,
	},
	containerSearch: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		height: minHeigthGlobal,
		borderRadius: borderRadiusGlobal,
		alignItems: "center",
		justifyContent: "center",
		borderColor: colorPrimary,
		borderWidth: 1,
		padding: 8,
		marginVertical: marginVertical_S,
		width: "100%",
		backgroundColor: colorWhite,
	},
	text: {
		fontSize: fontSizeGlobal,
		textAlign: "center",
		margin: "auto",
		marginVertical: marginVertical_M,
		color: colorPrimary,
	},
});
