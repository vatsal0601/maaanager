import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import formatDistance from "date-fns/formatDistance";

import { EXPENSE, FUND, INCOME } from "../database/transactions";

import { formatAmount } from "../lib/format-amount";

interface TransactionCardProps {
  title: string;
  tag: string;
  timestamp: Date;
  amount: number;
  type: typeof EXPENSE | typeof INCOME | typeof FUND;
}

const getAmountColor = (type: typeof EXPENSE | typeof INCOME | typeof FUND) => {
  switch (type) {
    case EXPENSE:
      return styles.expense;
    case INCOME:
      return styles.income;
    case FUND:
      return styles.fund;
  }
};

const TransactionCard = ({
  title,
  tag,
  timestamp,
  amount,
  type,
}: TransactionCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.transactionLeftContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subText}>
          {tag} &bull;{" "}
          {formatDistance(timestamp, new Date(), { addSuffix: true })}
        </Text>
      </View>
      <Text style={[styles.amount, getAmountColor(type)]}>
        {type !== FUND ? (type === INCOME ? "+" : "-") : null}
        {formatAmount(amount)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  transactionLeftContainer: {
    gap: 4,
  },
  title: {
    fontWeight: "700",
    fontSize: 20,
    color: "#030712",
  },
  subText: {
    color: "#4b5563",
    fontSize: 14,
  },
  amount: {
    fontWeight: "700",
    fontSize: 24,
  },
  income: {
    color: "#41BB82",
  },
  expense: {
    color: "#ef4444",
  },
  fund: {
    color: "#D181B6",
  },
});

export default TransactionCard;
