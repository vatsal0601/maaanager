import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { getTotalAmount } from "../database/accounts";
import { getTotalFundAmount } from "../database/funds";
import { EXPENSE, getCurrentMonthExpenses } from "../database/transactions";
import { useData } from "../contexts/DataContext";

import { formatAmount } from "../lib/format-amount";
import Plus from "../icons/plus";
import Layout from "../components/layout";
import TransactionCard from "../components/transaction-card";
import Button from "../components/ui/button";

const Home = () => {
  const [totalAmount, setTotalAmount] = React.useState(0);
  const [totalFundAmount, setTotalFundAmount] = React.useState(0);
  const [currentMonthExpenses, setCurrentMonthExpenses] = React.useState(0);

  const { name } = useData();

  React.useEffect(() => {
    const getData = async () => {
      const totalAmount = await getTotalAmount();
      const totalFundAmount = await getTotalFundAmount();
      const currentMonthExpenses = await getCurrentMonthExpenses();

      setTotalAmount(totalAmount);
      setTotalFundAmount(totalFundAmount);
      setCurrentMonthExpenses(currentMonthExpenses);
    };

    getData();
  }, []);

  const overviewData = [
    {
      id: 1,
      title: "Spendable amount",
      amount: totalAmount - totalFundAmount,
      color: "#41BB82",
      backgroundColor: "#41BB8233",
    },
    {
      id: 2,
      title: "Spent this month",
      amount: currentMonthExpenses,
      color: "#F07136",
      backgroundColor: "#F0713633",
    },
    {
      id: 3,
      title: "Total amount",
      amount: totalAmount,
      color: "#D181B6",
      backgroundColor: "#D181B633",
    },
    {
      id: 4,
      title: "Funds saved",
      amount: 0,
      color: "#F9DA32",
      backgroundColor: "#F9DA3233",
    },
  ];

  return (
    <Layout
      screenTitle="Home"
      button={
        <Button style={styles.buttonContainer}>
          <Plus width={20} height={20} stroke="#fff" strokeWidth={2} />
          <Text style={styles.buttonText}>Record transaction</Text>
        </Button>
      }
      containerStyle={styles.container}>
      <View style={styles.greetingsContainer}>
        <Text style={styles.title}>Hello, {name}</Text>
        <Text style={styles.subText}>Welcome back!</Text>
      </View>
      <View style={styles.overviewContiner}>
        <FlatList
          data={overviewData}
          renderItem={({ item, index }) => (
            <View
              style={[
                styles.overview,
                { backgroundColor: item.backgroundColor },
                index % 2 !== 0 && { marginLeft: 16 },
              ]}>
              <Text style={[styles.overviewTitle, { color: item.color }]}>
                {formatAmount(item.amount)}
              </Text>
              <Text style={styles.overviewSubText}>{item.title}</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          keyExtractor={item => `${item.id}`}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
      <View style={styles.recentTransactionContainer}>
        <View style={styles.recentTransactionTitleContainer}>
          <Text style={styles.title}>Recent transactions</Text>
          <Text style={styles.subText}>View all</Text>
        </View>
        <View style={{ gap: 16 }}>
          <TransactionCard
            title="Bought a new phone"
            tag="Shopping"
            timestamp={new Date()}
            amount={100000}
            type={EXPENSE}
          />
        </View>
      </View>
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
  greetingsContainer: {
    gap: 8,
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    color: "#030712",
  },
  subText: {
    color: "#9ca3af",
    fontSize: 16,
  },
  overviewContiner: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  overview: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flex: 1,
    height: 120,
  },
  overviewSubText: {
    fontWeight: "600",
    color: "#4b5563",
    fontSize: 12,
    marginTop: 8,
  },
  overviewTitle: {
    fontWeight: "700",
    fontSize: 32,
  },
  recentTransactionContainer: {
    gap: 16,
  },
  recentTransactionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default Home;
