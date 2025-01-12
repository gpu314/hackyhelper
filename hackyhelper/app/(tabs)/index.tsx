import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Page() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to HackyHelper!</Text>
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
  );
}

const styles = StyleSheet.create({
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
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 30,
    marginTop: 30,
    color: '#2C3E50',
    textAlign: 'center',
    letterSpacing: 1,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    color: 'black',
    paddingHorizontal: 15,
  },
  bot:{
    marginBottom: 20,
  },
  listContainer: {
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 20,
    width: '100%',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 15,
    color: 'black',
    lineHeight: 24,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#3498DB',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 6,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});
