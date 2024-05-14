import { StyleSheet, Pressable, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import COLOR from "../constants/color";

export const TButton = ({ title, onPress, page = false, params, back = false, paddingVertical = 12, disabled = false, backgroundColor = COLOR.LIGHTBLUE }) => {
    const navigation = useNavigation();
    const onNavigate = () => {
        navigation.navigate(page, params )
    }
    const onBack = () => {
        navigation.goBack();
    }
    return (
        <Pressable
            disabled={disabled}
            style={[
                styles.button,
                {
                    backgroundColor: !disabled ? COLOR.LIGHTBLUE : COLOR.DARKGRAY,
                    paddingVertical: paddingVertical
                }
            ]}
            onPress={
                back ? onBack :
                    page ? onNavigate :
                        onPress
            }
        >
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 12,
        borderRadius: 20,
        elevation: 3,
        borderWidth: 2,
    },
    text: {
        fontSize: 15,
        lineHeight: 20,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: COLOR.WHITE,
    },
});