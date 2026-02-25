import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  Success: { orderId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  T
>;

function ScreenLayout({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children?: React.ReactNode;
}) {

  return (
    <SafeAreaView
      style={styles.screenSafeArea}>
      <View style={styles.screen}>
        <View style={styles.card}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          <View style={styles.actions}>{children}</View>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ActionButton({
  label,
  onPress,
  variant = 'primary',
}: {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === 'secondary' && styles.buttonSecondary,
        pressed && styles.buttonPressed,
      ]}>
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.buttonTextSecondary,
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

function HomeScreen({ navigation }: ScreenProps<'Home'>) {
  return (
    <ScreenLayout
      title="Home Screen"
      subtitle="Mocked landing page for navigation POC">
      <ActionButton
        label="Go to Product"
        onPress={() => navigation.navigate('Product', { productId: 'SKU-1001' })}
      />
      <ActionButton
        label="Open Cart"
        variant="secondary"
        onPress={() => navigation.navigate('Cart')}
      />
    </ScreenLayout>
  );
}

function ProductScreen({ navigation, route }: ScreenProps<'Product'>) {
  return (
    <ScreenLayout
      title="Product Screen"
      subtitle={`Mocked product detail for ${route.params.productId}`}>
      <ActionButton label="Add to Cart" onPress={() => navigation.navigate('Cart')} />
      <ActionButton
        label="Back to Home"
        variant="secondary"
        onPress={() => navigation.navigate('Home')}
      />
    </ScreenLayout>
  );
}

function CartScreen({ navigation }: ScreenProps<'Cart'>) {
  return (
    <ScreenLayout title="Cart Screen" subtitle="Mocked cart summary and totals">
      <ActionButton
        label="Proceed to Checkout"
        onPress={() => navigation.navigate('Checkout')}
      />
      <ActionButton
        label="Continue Shopping"
        variant="secondary"
        onPress={() => navigation.navigate('Home')}
      />
    </ScreenLayout>
  );
}

function CheckoutScreen({ navigation }: ScreenProps<'Checkout'>) {
  return (
    <ScreenLayout
      title="Checkout Screen"
      subtitle="Mocked payment and delivery confirmation">
      <ActionButton
        label="Place Order"
        onPress={() => navigation.replace('Success', { orderId: 'ORD-9001' })}
      />
      <ActionButton
        label="Back to Cart"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
    </ScreenLayout>
  );
}

function SuccessScreen({ navigation, route }: ScreenProps<'Success'>) {
  return (
    <ScreenLayout
      title="Success Screen"
      subtitle={`Mocked order confirmation: ${route.params.orderId}`}>
      <ActionButton
        label="Back to Home"
        onPress={() => navigation.popToTop()}
      />
    </ScreenLayout>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'mistyrose', // Debug: navigation container background
    },
  };

  return (
    <SafeAreaProvider style={styles.safeAreaProvider}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitleStyle: styles.headerTitle,
            headerStyle: styles.header,
            headerTintColor: 'black',
            contentStyle: styles.navigatorContent,
          }}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name="Product"
            component={ProductScreen}
            options={{ title: 'Product' }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Cart' }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
          />
          <Stack.Screen
            name="Success"
            component={SuccessScreen}
            options={{ title: 'Success' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaProvider: {
    flex: 1,
    backgroundColor: 'khaki', // Debug: app root background
  },
  header: {
    backgroundColor: 'lightblue',
  },
  navigatorContent: {
    backgroundColor: 'pink', // Debug: native-stack scene content background
  },
  screen: {
    flex: 1,
    padding: 20,
    backgroundColor: 'lightgreen', // Debug: individual screen layout background
  },
  screenSafeArea: {
    flex: 1,
    backgroundColor: 'lightgreen',
  },
  card: {
    marginTop: 'auto',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 20,
    color: 'dimgray',
  },
  actions: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'midnightblue',
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: 'gainsboro',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: 'black',
  },
  headerTitle: {
    fontWeight: '700',
  },
});

export default App;
