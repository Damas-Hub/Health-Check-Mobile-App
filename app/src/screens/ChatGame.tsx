import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
} from "react-native";

const categories = ["flirty", "emotional", "fun", "spicy"];

const ChatGame = () => {
  const [question, setQuestion] = useState("");
  const [input, setInput] = useState("");
  const [currentCategory, setCurrentCategory] = useState("spicy");
  const [shuffleCount, setShuffleCount] = useState(0);

  const fetchQuestion = async (category: string) => {
      try {
        const response = await fetch(`https://your-vercel-app.vercel.app/api/questions?category=${category}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setQuestion(data.question);
        setInput(data.question);
      } catch (error) {
        console.error("Error fetching question:", error);
      }
    };
  
  const handleShuffle = () => {
    if (shuffleCount >= 2) {
      // Change category after 3 presses
      const newCategory =
        categories[Math.floor(Math.random() * categories.length)];
      setCurrentCategory(newCategory);
      setShuffleCount(0); // Reset counter
    } else {
      setShuffleCount(shuffleCount + 1);
    }
    fetchQuestion(currentCategory);
  };

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Button
          title="Play a Game"
          color="#FF5733"
          onPress={() => fetchQuestion("spicy")}
        />

        <Text style={styles.label}>Chat Message:</Text>
        <TextInput style={styles.input} value={input} onChangeText={setInput} />

        <Button
          title="Shuffle Question"
          color="#3498DB"
          onPress={handleShuffle}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    height: "100%",
    resizeMode: "cover",
  },
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
