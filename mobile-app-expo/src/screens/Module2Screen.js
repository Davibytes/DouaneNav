import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { mockDashboard, mockUser } from '../mockData';

const Module2Screen = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('officer@customstrack.ai');
  const [password, setPassword] = useState('CustomsTrack!2026');

  const dashboard = useMemo(() => mockDashboard, []);

  if (!loggedIn) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.logoBox}><Text style={styles.logoText}>CT</Text></View>
          <Text style={styles.eyebrow}>CUSTOMSTRACK AI</Text>
          <Text style={styles.title}>Mobile inspection access</Text>
          <Text style={styles.subtitle}>Use the demo credentials below to test the Module 2 workflow.</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" placeholder="Email" />
          <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" />
          <TouchableOpacity style={styles.button} onPress={() => setLoggedIn(true)}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.helper}>Demo: officer@customstrack.ai / CustomsTrack!2026</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>CUSTOMSTRACK AI</Text>
            <Text style={styles.title}>Operations dashboard</Text>
          </View>
          <View style={styles.logoBoxSmall}><Text style={styles.logoTextSmall}>CT</Text></View>
        </View>

        <View style={styles.userCard}>
          <Text style={styles.userName}>{mockUser.name}</Text>
          <Text style={styles.userRole}>{mockUser.role}</Text>
          <Text style={styles.userStation}>{mockUser.station}</Text>
        </View>

        <View style={styles.statsGrid}>
          {dashboard.stats.map((item) => (
            <View key={item.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{item.label}</Text>
              <Text style={styles.statValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alerts</Text>
          {dashboard.alerts.map((alert) => (
            <View key={alert.title} style={styles.listItem}>
              <Text style={styles.listTitle}>{alert.title}</Text>
              <Text style={styles.listText}>{alert.detail}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent inspections</Text>
          {dashboard.inspections.map((item) => (
            <View key={item.id} style={styles.listItem}>
              <Text style={styles.listTitle}>{item.id}</Text>
              <Text style={styles.listText}>{item.route}</Text>
              <Text style={styles.listStatus}>{item.status}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Synchronization status</Text>
          <Text style={styles.listText}>Inspection reports are queued locally and synchronized when a connection is available.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F8FA' },
  container: { flexGrow: 1, padding: 20, backgroundColor: '#F7F8FA' },
  logoBox: { width: 72, height: 72, borderRadius: 16, backgroundColor: '#fff', borderWidth: 2, borderColor: '#C9A227', alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  logoText: { fontSize: 24, fontWeight: '800', color: '#C9A227' },
  logoBoxSmall: { width: 46, height: 46, borderRadius: 12, backgroundColor: '#fff', borderWidth: 2, borderColor: '#C9A227', alignItems: 'center', justifyContent: 'center' },
  logoTextSmall: { fontSize: 16, fontWeight: '800', color: '#C9A227' },
  eyebrow: { color: '#2E7D32', fontSize: 12, fontWeight: '800', letterSpacing: 1.4, marginBottom: 6 },
  title: { fontSize: 24, fontWeight: '700', color: '#1B5E20', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#6C757D', marginBottom: 16, lineHeight: 20 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDE2E5', borderRadius: 10, padding: 12, marginBottom: 10 },
  button: { backgroundColor: '#2E7D32', borderRadius: 10, paddingVertical: 12, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontWeight: '700' },
  helper: { marginTop: 12, color: '#6C757D', fontSize: 12 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  userCard: { backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#DDE2E5', padding: 16, marginBottom: 12 },
  userName: { fontSize: 16, fontWeight: '700', color: '#2D3436' },
  userRole: { fontSize: 14, color: '#6C757D', marginTop: 4 },
  userStation: { fontSize: 13, color: '#2E7D32', marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  statCard: { flexBasis: '31%', minWidth: 100, backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDE2E5', borderRadius: 12, padding: 12 },
  statLabel: { fontSize: 12, color: '#6C757D' },
  statValue: { fontSize: 18, fontWeight: '700', color: '#1B5E20', marginTop: 4 },
  card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDE2E5', borderRadius: 14, padding: 14, marginBottom: 12 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#2D3436', marginBottom: 8 },
  listItem: { borderTopWidth: 1, borderTopColor: '#F0F3F5', paddingTop: 8, marginTop: 8 },
  listTitle: { fontSize: 14, fontWeight: '700', color: '#2D3436' },
  listText: { fontSize: 13, color: '#6C757D', marginTop: 2 },
  listStatus: { fontSize: 12, color: '#2E7D32', marginTop: 4, fontWeight: '700' },
});

export default Module2Screen;
