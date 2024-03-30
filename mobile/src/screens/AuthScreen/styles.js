import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})