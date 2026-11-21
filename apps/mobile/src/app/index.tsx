import type { OrderStatus } from "@starva/db/schema";
import { APP_NAME } from "@starva/lib/constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  const orderStatus: OrderStatus = "pending";

  return (
    <View style={styles.container}>
      <Text>
        {APP_NAME} — {orderStatus}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
