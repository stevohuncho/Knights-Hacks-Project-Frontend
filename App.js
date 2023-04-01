import { StyleSheet, Text, View, SafeAreaView, Button, Alert, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from './src/components/HomeScreen';
import { FilterScreen } from './src/components/FilterScreen';
import { ResultScreen } from './src/components/ResultScreen';
import { WheelScreen } from './src/components/WheelScreen';
import { myColors } from './src/styling/MyColors';


const Stack = createNativeStackNavigator();

function LogoTitle() {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/logo.jpg')}
    />
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          options=
          {{
            headerStyle: {
              backgroundColor: myColors.brown,
            },
            headerTintColor: myColors.white,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen options=
          {{
            headerStyle: {
              backgroundColor: myColors.brown,
            },
            headerTintColor: myColors.white,
          }}
          name="Search"
          component={FilterScreen}
        />
        <Stack.Screen options=
          {{
            headerStyle: {
              backgroundColor: myColors.brown,
            },
            headerTintColor: myColors.white,
          }}
          name="Results"
          component={ResultScreen}
        />
        <Stack.Screen options=
          {{
            headerStyle: {
              backgroundColor: myColors.brown,
            },
            headerTintColor: myColors.white,
          }}
          name="Wheel"
          component={WheelScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

