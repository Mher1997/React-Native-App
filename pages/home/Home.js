import React from 'react';
import {StyleSheet, View, Image, Button} from 'react-native';
import Input from '../../components/input/Input';

const Home = ({navigation}) => {

    return(
        <View style={{backgroundColor: '#D2FDFF', flex: 1}}>
            <View style={[styles.container, styles.horizontal]}>
                <Input placeholder="Home"/>
                <Input placeholder="password" secureTextEntry={true}/>
            </View>
            <View style={{padding: 20}}>
                <Button title="Log In" color="#f194ff" onPress={() => navigation.navigate('Login')}/>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 3,
      justifyContent: "flex-start"
    },
    horizontal: {
      flexDirection: "column",
      justifyContent: "flex-start",
      padding: 40,
    },
    logo: {
        width: 50,
        height: 50,
    }
});

export default Home;