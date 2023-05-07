import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useData } from "../contexts/DataContext";

import HomeIcon from "../icons/home";
import Plus from "../icons/plus";
import Layout from "../components/layout";
import Button from "../components/ui/button";

const Home = () => {
  const { name } = useData();

  return (
    <Layout
      icon={<HomeIcon solid fill="#fff" />}
      button={
        <Button style={styles.buttonContainer}>
          <Plus width={20} height={20} stroke="#fff" strokeWidth={2} />
          <Text style={styles.buttonText}>Record Transaction</Text>
        </Button>
      }
      containerStyle={styles.container}>
      <Text style={styles.title}>Hello, {name}</Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 48,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    backgroundColor: "#030712",
    borderRadius: 8,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#fff",
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
  },
});

export default Home;
