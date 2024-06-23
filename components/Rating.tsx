import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  size?: number;
  maxStars?: number;
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
} & React.ComponentProps<typeof View>;

const Rating = ({
  size,
  maxStars = 5,
  initialRating = 0,
  onRatingChange,
}: Props) => {
  const [rating, setRating] = useState(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleRating = (rate: number) => {
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: maxStars }, (_, index) => (
        <TouchableOpacity key={index} onPress={() => handleRating(index + 1)}>
          <FontAwesome
            name={index < rating ? "star" : "star-o"}
            size={size || 32}
            color={index < rating ? "#FFD700" : "#ccc"}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});

export default Rating;
