import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { addMenuItem } from './menuStore';

export default function AddItem() {
  const router = useRouter();
  
  // Input fields, error tracking, and success states
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [course, setCourse] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<any>({});
  const [success, setSuccess] = useState('');

  // Checks if fields are valid before saving
  const validate = () => {
    let newErrors: any = {};
    if (!name.trim()) newErrors.name = 'Dish name is required';
    if (!desc.trim()) newErrors.desc = 'Description is required';
    if (!course) newErrors.course = 'Please select a course';
    
    if (!price.trim()) newErrors.price = 'Price is required';
    else if (isNaN(Number(price)) || Number(price) <= 0) newErrors.price = 'Enter a valid price';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Saves data and provides UI alerts
  const handleSave = () => {
    if (!validate()) return;

    // Adds a unique ID using current timestamp and saves to menu store
    addMenuItem({
      id: Date.now().toString(),
      name: name.trim(),
      description: desc.trim(),
      course: course,
      price: price.trim(),
    });

    setSuccess(`"${name}" added successfully!`);
    Alert.alert('Success!', `"${name}" has been added to the menu.`);

    // Delay navigation so user can read the success message
    setTimeout(() => {
      router.push('/menu');
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <View style={styles.topLine} />
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.push('/menu')}><Text style={styles.backText}>←</Text></TouchableOpacity>
        <Text style={styles.title}>Add menu Item</Text>
      </View>

      {/* Shows green message box only on successful save */}
      {success ? (
        <View style={styles.successBox}>
          <Text style={styles.successText}>✓ {success}</Text>
        </View>
      ) : null}

      <Text style={styles.label}>Dish name *</Text>
      <TextInput placeholder="e.g. Burger" style={[styles.input, errors.name && styles.inputError]} value={name} onChangeText={(t)=>{setName(t); setErrors({...errors, name: null}); setSuccess('')}} />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Short description *</Text>
      <TextInput placeholder="Short description" style={[styles.input, { height: 80 }, errors.desc && styles.inputError]} value={desc} onChangeText={(t)=>{setDesc(t); setErrors({...errors, desc: null})}} multiline />
      {errors.desc && <Text style={styles.errorText}>{errors.desc}</Text>}

      <Text style={styles.label}>Course *</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginHorizontal: '6%', marginBottom: 4 }}>
        {['Starter', 'Main', 'Dessert'].map((c) => (
          <TouchableOpacity key={c} onPress={() => { setCourse(c); setErrors({...errors, course: null})}} style={[styles.chip, course === c && styles.chipActive]}>
            <Text style={[styles.chipText, course === c && styles.chipTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}

      <Text style={styles.label}>Price (R) *</Text>
      <TextInput placeholder="e.g. 120" style={[styles.input, errors.price && styles.inputError]} value={price} onChangeText={(t)=>{setPrice(t); setErrors({...errors, price: null})}} keyboardType="numeric" />
      {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Dish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 30 },
  topLine: { height: 5, backgroundColor: '#1A1A1A', width: '70%', alignSelf: 'center', marginBottom: 25 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: '6%', marginBottom: 20 },
  backText: { fontSize: 18, fontWeight: '700' },
  title: { fontSize: 16, fontWeight: '800' },
  successBox: { backgroundColor: '#D4EDDA', borderColor: '#28A745', borderWidth: 1, marginHorizontal: '6%', padding: 12, borderRadius: 8, marginBottom: 15 },
  successText: { color: '#155724', fontWeight: '700', fontSize: 13, textAlign: 'center' },
  label: { fontSize: 11, color: '#888', marginHorizontal: '6%', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F2F2F2', marginHorizontal: '6%', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12, fontSize: 13, borderWidth: 1, borderColor: '#EEE' },
  inputError: { borderColor: 'red', backgroundColor: '#FFF0F0' },
  errorText: { color: 'red', fontSize: 11, marginHorizontal: '6%', marginTop: 4 },
  chip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#DDD', backgroundColor: '#FFF' },
  chipActive: { backgroundColor: '#000', borderColor: '#000' },
  chipText: { fontSize: 11 },
  chipTextActive: { color: '#FFF' },
  saveBtn: { backgroundColor: '#2F4F73', marginHorizontal: '6%', paddingVertical: 14, borderRadius: 8, alignItems: 'center', marginTop: 25 },
  saveText: { color: '#FFF', fontWeight: '700', fontSize: 13 },
});
