import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MenuItem, menuItems } from './menuStore';

export default function Menu() {
  const router = useRouter();
  
  // Local screen states for menu list array and search input string
  const [items, setItems] = useState<MenuItem[]>([]);
  const [search, setSearch] = useState('');
  const [course, setCourse] = useState('All');

  // Reloads menu data from global store whenever the screen comes into focus
  useFocusEffect(useCallback(() => { setItems([...menuItems]); }, []));
  
  // Filters items dynamically based on name or course match
 const filtered = items.filter(i =>
  i.name.toLowerCase().includes(search.toLowerCase()) &&
  (course === 'All' || i.course === course)
  );

  
  // Statistics for the chef's overview
  const total = items.length;
  const average = total === 0
    ? 0
    : items.reduce((sum, i) => sum + Number(i.price), 0) / total;
  const countFor = (c: string) => items.filter(i => i.course === c).length;


  // DELETE: Removes item from global store and reflects immediately
  const handleDelete = (id: string) => {
    const performDelete = () => {
      const index = menuItems.findIndex(m => String(m.id) === String(id));
      if (index !== -1) {
        menuItems.splice(index, 1); // delete from global store
        setItems([...menuItems]); // update local state to reflect immediately
      }
    };

    // Safe handling for Web vs Mobile alerts
    if (Platform.OS === 'web') {
      if (confirm("Are you sure you want to delete this dish?")) {
        performDelete();
      }
    } else {
      Alert.alert(
        "Delete Item",
        "Are you sure you want to delete this dish?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: performDelete }
        ]
      );
    }
  };

  // EDIT: Navigate to edit screen with item id
  const handleEdit = (id: string) => {
    router.push({ pathname: '/edit-item', params: { id } } as any);
  };

  return (
    <View style={styles.container}>

                <View style={styles.statsBox}>
        <Text style={styles.statsTitle}>Menu Statistics</Text>
        <Text style={styles.statsText}>Total items: {total}</Text>
        <Text style={styles.statsText}>Average price: R{average.toFixed(2)}</Text>
        <Text style={styles.statsText}>Starters: {countFor('Starters')}</Text>
        <Text style={styles.statsText}>Main courses: {countFor('Main courses')}</Text>
        <Text style={styles.statsText}>Desserts: {countFor('Desserts')}</Text>
      </View>

      {/* Top layout decorative accent line */}
      <View style={styles.topLine} />
      
      <View style={styles.headerRow}>
        <View style={styles.leftHeader}>
          {/* Back button routing trigger */}
          <TouchableOpacity onPress={() => router.push('/')}><Text style={styles.backText}>←</Text></TouchableOpacity>
          <Text style={styles.title}>Menu Items</Text>
        </View>
        {/* Navigation button to access add item form */}
        <TouchableOpacity style={styles.plusBtn} onPress={() => router.push('/add-item')}><Text style={styles.plusText}>+</Text></TouchableOpacity>
      </View>

            <View style={styles.filterRow}>
        {['All', 'Starters', 'Main courses', 'Desserts'].map(courseName => (
          <TouchableOpacity
            key={courseName}
            onPress={() => setCourse(courseName)}
            style={[styles.filterChip, course === courseName && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, course === courseName && styles.filterTextActive]}>{courseName}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Input textbox element managing live search state string updates */}
      <View style={styles.searchBox}>
        <TextInput placeholder="Search" style={styles.searchInput} value={search} onChangeText={setSearch} />
      </View>

            {(search !== '' || course !== 'All') && (
        <TouchableOpacity
          onPress={() => { setSearch(''); setCourse('All'); }}
          style={{ alignSelf: 'flex-start', marginHorizontal: '6%', marginBottom: 10 }}
        >
          <Text style={{ fontSize: 12, color: '#2F4F73', fontWeight: '700' }}>Clear search and filter</Text>
        </TouchableOpacity>
      )}

      {/* Conditional renderer layout logic */}
      {filtered.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>{search ? 'No results found' : 'No menu items yet'}</Text>
          <Text style={styles.emptyDesc}>{search ? `No dishes match "${search}"` : 'Tap + to add your first dish to the menu.'}</Text>
        </View>
      ) : (
        /* Scrolling display list mapping layout for structural list views */
        <FlatList
          data={filtered}
          keyExtractor={item => String(item.id)}
          style={{ width: '100%' }}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <View style={styles.itemLeft}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemCourse}>{item.course}</Text>
                
                {/* INTERACTIVE ACTION ROW FOR EDIT / DELETE */}
                <View style={styles.actionRow}>
                  <TouchableOpacity style={styles.editBtn} onPress={() => handleEdit(item.id)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                </View>
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
  actionRow: { flexDirection: 'row', marginTop: 10, gap: 10 },
  editBtn: { backgroundColor: '#2F4F73', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 5 },
  editText: { color: '#FFF', fontSize: 10, fontWeight: '700' },
  deleteBtn: { backgroundColor: '#FFEBEB', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 5, borderWidth: 1, borderColor: '#FFCCCC' },
  deleteText: { color: '#D00', fontSize: 10, fontWeight: '700' },
    statsBox: { backgroundColor: '#F2F6FA', marginHorizontal: '6%', marginBottom: 12, padding: 12, borderRadius: 8 },
  statsTitle: { fontSize: 13, fontWeight: '800', color: '#000', marginBottom: 6 },
  statsText: { fontSize: 12, color: '#000' },
    filterRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingHorizontal: '6%', marginBottom: 10 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, backgroundColor: '#F2F2F2' },
  filterChipActive: { backgroundColor: '#2F4F73' },
  filterText: { fontSize: 11, fontWeight: '600', color: '#000' },
  filterTextActive: { color: '#FFF' },
});
