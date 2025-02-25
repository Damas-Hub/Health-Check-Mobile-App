import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const ChatGame = () => {
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");

  const fetchQuestion = async () => {
    try {
      const response = await fetch("http://192.168.199.210:5000/question?category=fun");
      const data = await response.json();
      setQuestion(data.question);
      setInput(data.question); // Insert into input field
    } catch (error) {
      console.error("Error fetching question:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Chat Input:</Text>
      <TextInput 
        style={styles.input} 
        value={input} 
        onChangeText={setInput} 
      />
      <Button title="Play a Game" onPress={fetchQuestion} />
      <Button title="Shuffle Question" onPress={fetchQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default ChatGame;
