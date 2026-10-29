import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#2F4F73' },
        headerTintColor: '#FFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="menu" options={{ title: 'Menu Items' }} />
      <Stack.Screen name="add-item" options={{ title: 'Add Menu Item' }} />
      <Stack.Screen name="edit-item" options={{ title: 'Edit Dish' }} />
    </Stack>
  );
}