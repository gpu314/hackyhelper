import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

export default function Page() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBar}>
          <Text style={styles.headerTitle}>Welcome to HackyHelper!</Text>
      </View>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.description}>
            HackyHelper is your go-to AI companion designed to assist hackers in all aspects of their hackathon.
          </Text>

          <View style={styles.listContainer}>
            <Text style={styles.listItem}>Our product includes:</Text>
            <Text style={styles.listItem}>
              • A personal AI companion to help you through the hackathon. You can ask it anything! This includes what upcoming workshops you might want to attend or what time the next meal is.
            </Text>
            <Text style={styles.listItem}>
              • Use a map to locate event locations (opening ceremony, hacking spaces, etc.). If you ever get lost, this is your tool!
            </Text>
            <Text style={styles.listItem}>
              • An enhanced version of Rubber Duck Debugging! Explain the issue to the AI model, and it will provide feedback as both of you race to solve your bug.
            </Text>
            <Text style={styles.listItem}>
              • A convenient contact page for quickly finding hackathon emergency (or regular) contact information.
            </Text>
          </View>

          <Text style={styles.bot}>Check out our page options below!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 0,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    backgroundColor: 'white',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  locationText: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: '#20283E',
    paddingHorizontal: 15,
  },
  listContainer: {
    marginBottom: 20,
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 15,
    color: '#20283E',
    lineHeight: 22,
    paddingLeft: 10,
    fontWeight: '500',
  },
  bot: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: '600',
    color: '#36827F',
  },
});
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();