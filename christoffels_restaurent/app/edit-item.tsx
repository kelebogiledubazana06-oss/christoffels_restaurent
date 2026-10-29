import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { menuItems } from './menuStore';

export default function EditItem() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const id = params.id as string;

  // Form input states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');

  // Find and load the existing menu item details on mount
  useEffect(() => {
    const item = menuItems.find((m) => String(m.id) === String(id));
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setCourse(item.course);
      setPrice(String(item.price));
    }
  }, [id]);

  // Handle saving the updated changes back to the global array
  const handleSave = () => {
    if (!name.trim() || !description.trim() || !course.trim() || !price.trim()) {
      if (Platform.OS === 'web') {
        alert("All fields are required.");
      } else {
        Alert.alert("Validation Error", "All fields are required.");
      }
      return;
    }

    // Find the item index in the shared memory store and replace its fields
    const index = menuItems.findIndex((m) => String(m.id) === String(id));
    if (index !== -1) {
      menuItems[index] = {
        ...menuItems[index],
        name: name.trim(),
        description: description.trim(),
        course: course.trim(),
        price: price.trim(), // Kept as string to match your menuStore type declaration
      };

      if (Platform.OS === 'web') {
        alert("Menu item updated successfully!");
        router.replace('/menu');
      } else {
        Alert.alert("Success", "Menu item updated successfully!", [
          { text: "OK", onPress: () => router.replace('/menu') }
        ]);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLine} />

      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Dish Info</Text>
        <View style={{ width: 50 }} />
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Dish Name</Text>
        <TextInput 
          style={styles.input} 
          value={name} 
          onChangeText={setName} 
          placeholder="e.g., Grilled Ribeye"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput 
          style={[styles.input, styles.textArea]} 
          value={description} 
          onChangeText={setDescription} 
          placeholder="Describe the dish ingredients..."
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Course Type</Text>
        <TextInput 
          style={styles.input} 
          value={course} 
          onChangeText={setCourse} 
          placeholder="Starters, Main courses, Desserts"
        />

        <Text style={styles.label}>Price (ZAR)</Text>
        <TextInput 
          style={styles.input} 
          value={price} 
          onChangeText={setPrice} 
          placeholder="e.g., 285"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 30 },
  topLine: { height: 5, backgroundColor: '#1A1A1A', width: '70%', alignSelf: 'center', marginBottom: 25 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '6%', marginBottom: 30 },
  backText: { fontSize: 14, fontWeight: '600', color: '#888' },
  title: { fontSize: 18, fontWeight: '800', color: '#000' },
  form: { paddingHorizontal: '6%', gap: 15 },
  label: { fontSize: 12, fontWeight: '700', color: '#2F4F73', marginBottom: -5 },
  input: { borderBottomWidth: 1, borderBottomColor: '#CCC', paddingVertical: 8, fontSize: 14, color: '#000' },
  textArea: { textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#2F4F73', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  saveText: { color: '#FFF', fontSize: 14, fontWeight: '700' },
});
