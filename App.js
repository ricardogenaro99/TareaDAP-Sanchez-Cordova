import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FlashMessage from "react-native-flash-message";
import {
	HomeScreen,
	LoginScreen,
	RegisterScreen,
	RestaurantScreen
} from "./app/screens";
import { colorPrimary } from "./app/shared/utils/constValues";

const Stack = createNativeStackNavigator();

const optionsProps = {
	headerTitleAlign: "center",
	headerTintColor: colorPrimary,
};
export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="login">
				<Stack.Screen
					name="login"
					component={LoginScreen}
					options={{ title: "Iniciar Sesión", ...optionsProps }}
				/>
				<Stack.Screen
					name="register"
					component={RegisterScreen}
					options={{ title: "Registrate", ...optionsProps }}
				/>
				<Stack.Screen
					name="home"
					component={HomeScreen}
					options={{ title: "Buscar", ...optionsProps }}
				/>
				<Stack.Screen
					name="restaurant"
					component={RestaurantScreen}
					options={{ title: "Restaurante", ...optionsProps }}
				/>
			</Stack.Navigator>
			<FlashMessage position="top" statusBarHeight={55} />
		</NavigationContainer>
	);
}
