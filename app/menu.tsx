import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { menuItems, MenuItem } from './menuStore';

export default function Menu() {
  const router = useRouter();
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');

  useFocusEffect(useCallback(() => { setItems([...menuItems]); }, []));
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.course.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.container}>
      <View style={styles.topLine} />
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          <TouchableOpacity onPress={() => router.push('/')}><Text style={styles.backText}>←</Text></TouchableOpacity>
          <Text style={styles.title}>Menu Items</Text>
        </View>
        <TouchableOpacity style={styles.plusBtn} onPress={() => router.push('/add-item')}><Text style={styles.plusText}>+</Text></TouchableOpacity>
      </View>

      <View style={styles.searchBox}>
        <TextInput placeholder="Search" style={styles.searchInput} value={search} onChangeText={setSearch} />
      </View>

      {filtered.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>{search ? 'No results found' : 'No menu items yet'}</Text>
          <Text style={styles.emptyDesc}>{search ? `No dishes match "${search}"` : 'Tap + to add your first dish to the menu.'}</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemCourse}>{item.course}</Text>
              </View>
              <Text style={styles.itemPrice}>R{item.price}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', paddingTop: 30 },
  topLine: { height: 5, backgroundColor: '#1A1A1A', width: '70%', alignSelf: 'center', marginBottom: 25 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: '6%', marginBottom: 15 },
  leftHeader: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  backText: { fontSize: 18, fontWeight: '700', color: '#000' },
  title: { fontSize: 18, fontWeight: '800', color: '#000' },
  plusBtn: { backgroundColor: '#2F4F73', width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  plusText: { color: '#FFF', fontSize: 18, fontWeight: '600', marginTop: -2 },
  searchBox: { backgroundColor: '#F2F2F2', marginHorizontal: '6%', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 10 },
  searchInput: { fontSize: 13 },
  emptyBox: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: '10%', marginTop: 80 },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#000', marginBottom: 8 },
  emptyDesc: { fontSize: 12, color: '#888', textAlign: 'center', lineHeight: 18 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: '6%', paddingVertical: 18, borderBottomWidth: 1, borderBottomColor: '#F0F0F0' },
  itemLeft: { flex: 1, paddingRight: 15 },
  itemName: { fontSize: 13, fontWeight: '700', color: '#000', marginBottom: 4 },
  itemDesc: { fontSize: 11, color: '#888', lineHeight: 16, marginBottom: 6 },
  itemCourse: { fontSize: 10, color: '#2F4F73', fontWeight: '600' },
  itemPrice: { fontSize: 12, fontWeight: '700', color: '#000' },
});