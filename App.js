import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login/login';
import Home from './pages/home/Home';
import Room from './pages/room/Room';

const Stack = createStackNavigator();

const App = () => (
    <NavigationContainer>
        <Stack.Navigator mode="modal" headerMode="none">
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Home" component={Home} options={{ title: 'Home' }}/>
            <Stack.Screen name="Room" component={Room}/>
        </Stack.Navigator>
    </NavigationContainer>
);


export default App;
