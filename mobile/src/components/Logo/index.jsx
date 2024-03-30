import {Image, Text, View} from 'react-native'
import { styles } from './styles'


export const Logo = () => {
    return (
        <View>
            <Image source={require('../../../assets/logo.png')} style={styles.image}/> 
        </View>
    )
}