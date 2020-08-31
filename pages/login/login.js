import React from 'react';
import {StyleSheet, View, Image, Button, ImageBackground} from 'react-native';
import Input from '../../components/input/Input';

const Login = ({navigation}) => {

    return(
        <View style={styles.content}>
            <ImageBackground source={require('../../images/login.jpg')} style={styles.image}>
                <View style={[styles.container, styles.horizontal]}>
                    <Input placeholder="login"/>
                    <Input placeholder="password" secureTextEntry={true}/>
                </View>
                <View style={{padding: 20}}>
                    <Button title="Sign In" color="#4E0000" onPress={() => navigation.navigate('Room')}/>
                </View>
            </ImageBackground>
        </View>
    )
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        flexDirection: "column"
    },
    container: {
      flex: 2,
      justifyContent: "center",
      marginTop: 50
    },
    horizontal: {
      flexDirection: "column",
      justifyContent: "center",
      padding: 40,
    },
    logo: {
        width: 50,
        height: 50,
    },
    image: {
        flex: 1,
        resizeMode: "stretch",
        justifyContent: "center",
        width: "100%",
    },
});

export default Login;