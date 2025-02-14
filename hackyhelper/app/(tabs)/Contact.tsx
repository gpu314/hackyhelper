import React from 'react';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

export default function Contact() {
  const openEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const openPhone = (tel: string) => {
    Linking.openURL(`tel:+${tel}`);
  };

  const openInstagram = (handle: string) => {
    Linking.openURL(`https://www.instagram.com/${handle}/`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>Contact the hackathon organizers!</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email Us</Text>
            <TouchableOpacity onPress={() => openEmail("wits.uwo@gmail.com")}>
              <Text style={styles.link}>wits.uwo@gmail.com</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Email to Report an Incident</Text>
            <TouchableOpacity onPress={() => openEmail("incident@mlh.io")}>
              <Text style={styles.link}>incident@mlh.io</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phone (Campus Police)</Text>
            <TouchableOpacity onPress={() => openPhone("+1 (519)-661-3300")}>
              <Text style={styles.link}>+1 (519)-661-3300</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Phone (MLH)</Text>
            <TouchableOpacity onPress={() => openPhone("+1 (343)-453-4532")}>
              <Text style={styles.link}>+1 (343)-453-4532</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Follow Us</Text>
            <TouchableOpacity onPress={() => openInstagram("wits.uwo")}>
              <Text style={styles.link}>@wits.uwo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Need help? Visit our help desk!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerBar: {
    height: 60,
    backgroundColor: '#8B59F5',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    width: '100%',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  // header: {
  //   marginBottom: 30,
  //   alignItems: 'center',
  //   backgroundColor: '#5ea1ed',
  //   width: '100%',
  //   paddingVertical: 15,
  // },

  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#20283E',
    marginBottom: 8,
  },
  sectionInfo: {
    fontSize: 16,
    color: '#20283E',
    marginBottom: 8,
    marginTop: 8,
  },
  link: {
    fontSize: 16,
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 40,
    //alignItems: 'center',
  },
  footerText: {
    fontSize: 16,
    color: '#555',
  },
});
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();