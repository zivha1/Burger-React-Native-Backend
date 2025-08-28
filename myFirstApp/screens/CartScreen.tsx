import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
} from "react-native";
import { AppStackParamList } from "@/types/navigation";
import {
  useOrder,
  useRemoveProduct,
  useAddProduct,
  useDecreaseProduct,
  useClearOrder,
} from "@/hooks/useOrder";
import { useAuth } from "@/context/authContext";

type CartProp = NativeStackNavigationProp<AppStackParamList, "Cart">;

export default function CartScreen({ navigation }: { navigation: CartProp }) {
  const { user } = useAuth();
  const userId = user?._id;

  const {
    data: order,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useOrder(userId!);
  const { mutate: removeOne, isPending: removing } = useRemoveProduct(userId!);
  const { mutate: addOne, isPending: adding } = useAddProduct(userId!);
  const { mutate: decOne, isPending: decing } = useDecreaseProduct(userId!);
  const { mutate: clearAll, isPending: clearing } = useClearOrder(userId!);

  const items = order?.items ?? [];

  const { totalQty, subtotal } = useMemo(() => {
    let totalQty = 0;
    let subtotal = 0;
    for (const it of items) {
      const q = Number(it.quantity ?? 0);
      const unit = Number(
        (typeof it.product === "object" ? it.product.price : 0) ?? 0
      );
      const line = typeof it.productSum === "number" ? it.productSum : unit * q;
      totalQty += q;
      subtotal += line;
    }
    return { totalQty, subtotal };
  }, [items]);

  const money = (n: number) => `$${n.toFixed(2)}`;
  const getPid = (p: any) => String(typeof p === "string" ? p : p?._id ?? "");

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 8, color: "#666" }}>Loading your cart…</Text>
      </SafeAreaView>
    );
  }

  if (isError) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <Text style={styles.title}>Couldn’t load your cart</Text>
        <Text style={styles.cardTitle}>Try adding product to your cart</Text>
        <Pressable
          style={[styles.btn, styles.btnPrimary]}
          onPress={() => refetch()}
        >
          <Text style={styles.btnTextPrimary}>Try again</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  if (!items.length) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center" }]}>
        <Ionicons name="cart-outline" size={64} color="#bbb" />
        <Text style={[styles.title, { marginTop: 12 }]}>
          Your cart is empty
        </Text>
        <Text style={{ color: "#6b7280", marginTop: 4 }}>
          Go add something you love.
        </Text>
        <Pressable
          style={[styles.btn, styles.btnPrimary, { marginTop: 16 }]}
          onPress={() => navigation.navigate("Products")}
        >
          <Text style={styles.btnTextPrimary}>Continue shopping</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="cart" size={22} color="#111827" />
          <Text style={styles.title}>Cart</Text>
          <View style={styles.qtyBadge}>
            <Text style={styles.qtyBadgeText}>{totalQty}</Text>
          </View>
        </View>

        <Pressable onPress={() => clearAll()} style={styles.refresh}>
          <Ionicons name="trash" size={18} color="#ff1515ff" />
          <Text style={styles.refreshText}>
            {clearing ? "Canceling order..." : "Cancel Order"}
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(it) => getPid(it.product)}
        contentContainerStyle={{ paddingBottom: 140 }}
        renderItem={({ item }) => {
          const pid = getPid(item.product);
          const title =
            typeof item.product === "object" ? item.product.title : "Product";
          const image =
            typeof item.product === "object" ? item.product.image : undefined;
          const unitPrice = Number(
            typeof item.product === "object" ? item.product.price : 0
          );
          const qty = Number(item.quantity ?? 0);
          const lineTotal =
            typeof item.productSum === "number"
              ? item.productSum
              : unitPrice * qty;

          return (
            <View style={styles.card}>
              <Image source={{ uri: image }} style={styles.cardImg} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {money(unitPrice)}{" "}
                  <Text style={{ color: "#6b7280" }}>/ unit</Text>
                </Text>

                <View style={styles.rowBetween}>
                  <View style={styles.stepper}>
                    <Pressable
                      style={[styles.stepBtn, decing && styles.stepBtnDisabled]}
                      disabled={decing || qty <= 0}
                      onPress={() => decOne(pid)}
                    >
                      <Ionicons name="remove" size={18} color="#111827" />
                    </Pressable>
                    <Text style={styles.stepQty}>{qty}</Text>
                    <Pressable
                      style={[styles.stepBtn, adding && styles.stepBtnDisabled]}
                      disabled={adding}
                      onPress={() => addOne(pid)}
                    >
                      <Ionicons name="add" size={18} color="#111827" />
                    </Pressable>
                  </View>

                  <Text style={styles.lineTotal}>{money(lineTotal)}</Text>
                </View>

                <Pressable
                  style={styles.deleteRow}
                  onPress={() => removeOne(pid)}
                  disabled={removing}
                >
                  <Ionicons name="trash-outline" size={16} color="#ef4444" />
                  <Text style={styles.deleteText}>
                    {removing ? "Removing…" : "Remove"}
                  </Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      />

      {/* Sticky summary footer */}
      <View style={styles.summaryBar}>
        <View>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{money(subtotal)}</Text>
        </View>
        <Pressable
          style={[styles.btn, styles.btnPrimary, styles.checkoutBtn]}
          onPress={() => {}}
        >
          <Text style={styles.btnTextPrimary}>Checkout ({totalQty})</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", paddingHorizontal: 16 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#111827" },
  qtyBadge: {
    marginLeft: 6,
    backgroundColor: "#111827",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  qtyBadgeText: { color: "white", fontWeight: "700", fontSize: 12 },

  refresh: { flexDirection: "row", alignItems: "center", gap: 6, padding: 6 },
  refreshText: { color: "#ff0000ff", fontWeight: "600" },

  card: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    gap: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 2,
  },
  cardImg: {
    width: 96,
    height: 96,
    borderRadius: 10,
    backgroundColor: "#E5E7EB",
  },
  cardInfo: { flex: 1 },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
    marginBottom: 2,
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#111827", marginTop:2, marginBottom:2 },
  cardSubtitle: { fontSize: 14, color: "#374151", marginTop: 2 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 999,
    paddingHorizontal: 6,
  },
  stepBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnDisabled: { opacity: 0.5 },
  stepQty: {
    minWidth: 28,
    textAlign: "center",
    fontWeight: "700",
    color: "#111827",
  },

  lineTotal: { fontSize: 16, fontWeight: "700", color: "#111827" },

  deleteRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  deleteText: { color: "#ef4444", fontWeight: "600" },

  summaryBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 12,
    elevation: 8,
  },
  summaryLabel: { color: "#6b7280", fontSize: 12, fontWeight: "600" },
  summaryValue: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 2,
  },

  btn: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  btnPrimary: { backgroundColor: "#111827" },
  btnTextPrimary: { color: "#fff", fontWeight: "700" },
  checkoutBtn: { minWidth: 160 },
});
