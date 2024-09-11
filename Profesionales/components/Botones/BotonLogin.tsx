import {Text, StyleSheet,Pressable } from "react-native"

const Boton=({onPress,text}:any)=>{
    return(
        <Pressable onPress={onPress} style={styles.container}>
            <Text>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{ 
        backgroundColor:'#F0421D',
        width:'100%',

        padding:15,
        marginVertical:5,
        
        alignItems:"center",
        borderRadius:10,
    },
    Text:{
        fontWeight:'bold',
        color:'black',
    }
});

export default Boton