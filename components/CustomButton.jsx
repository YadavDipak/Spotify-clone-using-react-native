import { Text, Pressable } from "react-native";
import React from "react";

const CustomButton = ({
  isActive,
  handlePress,
  categoryKey,
  categoryLabel,
}) => {
  return (
    <Pressable
      onPress={() => handlePress(categoryKey)}
      style={{
        backgroundColor: isActive ? "#40ff00" : "#282828",
        paddingTop: 5,
        paddingBottom: 5,
        paddingHorizontal: 16,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: isActive ? "black" : "white" }}>
        {categoryLabel}
      </Text>
    </Pressable>
  );
};

export default CustomButton;
