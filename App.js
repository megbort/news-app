/////////////////////////////////////////////
// Megan Krenbrink - App Dev 2 - Assign 01 //
/////////////////////////////////////////////

import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';

import Screen01 from './screens/Screen01';
import Screen02 from './screens/Screen02';
import Screen03 from './screens/Screen03';

const Tab = createBottomTabNavigator();

export default function App() {
  // load fonts
  let [fontsLoaded] = useFonts({
    'Arvin': require('./assets/fonts/Arvin.ttf'),
    'Arvin-Bold': require('./assets/fonts/Arvin-Bold.ttf'),
    'Arvin-Bold-Italic': require('./assets/fonts/Arvin-Bold-Italic.ttf'),
    'Arvin-Italic': require('./assets/fonts/Arvin-Italic.ttf'),
    'Arvin-Light': require('./assets/fonts/Arvin-Light.ttf'),
    'Arvin-Light-Italic': require('./assets/fonts/Arvin-Light-Italic.ttf'),
  })
  // if the fonts are NOT loaded show a loading icon and wait for fonts to be loaded
  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='small' color='#2B2D42' />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#2B2D42',
            tabBarInactiveTintColor: '#8D99AE'
          }}>
          <Tab.Screen
            name="Top Stories"
            component={Screen01}
            options={{
              headerStyle: {
                backgroundColor: '#2B2D42',
              },
              headerTintColor: '#EDF2F4',
              headerTitleStyle: {
                fontFamily: 'Arvin-Bold',
                fontSize: 20,
                marginLeft: 10,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="newspaper-variant" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={Screen02}
            options={{
              headerStyle: {
                backgroundColor: '#2B2D42',
              },
              headerTintColor: '#EDF2F4',
              headerTitleStyle: {
                fontFamily: 'Arvin-Bold',
                fontSize: 20,
                marginLeft: 10,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="magnify" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Sections"
            component={Screen03}
            options={{
              headerStyle: {
                backgroundColor: '#2B2D42',
              },
              headerTintColor: '#EDF2F4',
              headerTitleStyle: {
                fontFamily: 'Arvin-Bold',
                fontSize: 20,
                marginLeft: 10,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="format-line-weight" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
});