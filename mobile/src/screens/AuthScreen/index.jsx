import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Logo } from "../../components/Logo";

export default function AuthScreen() {

    const [isLogin, setIsLogin] = useState(false)

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.content}>
                <Logo />

                <TouchableOpacity>
                    <Text style={{color:'#FFF'}}>Ainda não possui conta? Cadastre-se!</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}