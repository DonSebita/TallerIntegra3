import React from "react";
import { View,TextInput,StyleSheet } from "react-native";

const EntradaDatos=({value,setValue,placeholder,secureTextEntry}:any)=>{

    return(
        <View style={styles.container}>

            <TextInput
                style={styles.input}
                value={value}
                placeholder={placeholder}
                onChangeText={setValue}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        width: "100%",
        borderRadius: 10,

        paddingHorizontal:10,
        marginVertical:10,
    },

    input: {
      textAlign: 'center',

    },
});

export default EntradaDatos;