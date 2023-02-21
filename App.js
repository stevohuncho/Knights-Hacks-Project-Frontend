import { StyleSheet, Text, View, SafeAreaView, Button, Alert } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.app}>
        <Text>This will be an app soon</Text>
        <Button title="Click here for now."
          onPress={() => {
            Alert.alert("Hey Guys", "what's up", [
              { text: "Hello" },
              { text: "Bye." }
            ])
          }
          } />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  app: {
    height: 200,
    width: 200,
    borderRadius: 200,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
