import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, FONTS, RADIUS } from '../theme';
import { HomeScreen } from '../screens/HomeScreen';
import { TryHmmScreen } from '../screens/TryHmmScreen';
import { AboutScreen } from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TryHmm"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: COLORS.clarityGold,
          tabBarInactiveTintColor: COLORS.ink,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => {
            let iconText = '🏠';
            let label = 'Home';

            if (route.name === 'Home') {
              iconText = '🏛️';
              label = 'Home';
            } else if (route.name === 'TryHmm') {
              iconText = '✨';
              label = 'Try Hmm';
            } else if (route.name === 'About') {
              iconText = 'ℹ️';
              label = 'About';
            }

            return (
              <View style={[styles.iconContainer, focused && styles.iconActive]}>
                <Text style={styles.iconSymbol}>{iconText}</Text>
              </View>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen
          name="TryHmm"
          component={TryHmmScreen}
          options={{
            tabBarLabel: 'Try Hmm',
          }}
        />
        <Tab.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarLabel: 'About',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.paper,
    borderTopWidth: 1.5,
    borderTopColor: COLORS.line,
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 11,
    marginTop: 2,
  },
  iconContainer: {
    width: 34,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: RADIUS.sm,
  },
  iconActive: {
    backgroundColor: COLORS.goldMuted,
  },
  iconSymbol: {
    fontSize: 16,
  },
});
