import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerLine} />
      
      <Text style={styles.restaurantName}>Christoffel's Restaurant</Text>

      <View style={styles.logoBox}>
        <Image
        source={require('../assets/images/CR_logo.png')}
        style={{width: 50, height: 55}}
        resizeMode="contain"
        />
      </View>

      <Text style={styles.subtitle}>Special & Delicious Beverages</Text>

      <Text style={styles.welcome}>WELCOME</Text>

      <TouchableOpacity style={styles.btn} onPress={() => router.push('/menu')}>
        <Text style={styles.btnText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerLine: {
    height: 8,
    width: '80%',
    backgroundColor: '#2b2b2b',
    marginBottom: 30,
  },
  restaurantName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  logoBox: {
    backgroundColor: '#0a4a8a',
    height: 60,
    width: 220,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7c8d',
    marginBottom: 50,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 80,
  },
  btn: {
    backgroundColor: '#0a4a8a',
    paddingHorizontal: 22,
    paddingVertical: 8,
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 12,
  },
});

