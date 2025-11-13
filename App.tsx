import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { Component, ErrorInfo, ReactNode } from 'react';
import { View, Text } from 'react-native';
import { RequestsProvider } from './src/context/RequestsContext';
import { RoleSelectionScreen } from './src/screens/RoleSelectionScreen';
import { ClientFormScreen } from './src/screens/ClientFormScreen';
import { HunterListScreen } from './src/screens/HunterListScreen';
import { RequestDetailScreen } from './src/screens/RequestDetailScreen';
import type { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

enableScreens(true);

class RootErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean; error?: Error }> {
  state = { hasError: false as boolean, error: undefined as Error | undefined };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('RootErrorBoundary', error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12 }}>Un problème est survenu.</Text>
          <Text style={{ textAlign: 'center', color: '#6B7280' }}>
            {this.state.error?.message ?? 'Erreur inconnue'}
          </Text>
        </View>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <RequestsProvider>
      <SafeAreaProvider>
        <RootErrorBoundary>
          <NavigationContainer>
            <StatusBar style="dark" />
            <Stack.Navigator
              initialRouteName="RoleSelection"
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: '#F3F4F6' },
              }}
            >
              <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
              <Stack.Screen name="ClientForm" component={ClientFormScreen} />
              <Stack.Screen name="HunterList" component={HunterListScreen} />
              <Stack.Screen name="RequestDetail" component={RequestDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </RootErrorBoundary>
      </SafeAreaProvider>
    </RequestsProvider>
  );
}
