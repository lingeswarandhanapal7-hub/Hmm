import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation/AppNavigator';
import { IntroScreen } from './src/screens/IntroScreen';
import { COLORS } from './src/theme';

function App(): React.JSX.Element {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <AppNavigator />
        {showIntro && <IntroScreen onFinish={() => setShowIntro(false)} />}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.paper,
  },
});

export default App;
