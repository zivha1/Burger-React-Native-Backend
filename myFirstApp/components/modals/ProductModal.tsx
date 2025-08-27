import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/types/product";
import { useAddProduct } from "@/hooks/useOrder";
import { useDecreaseProduct, useOrder } from "@/hooks/useOrder";
import { useAuth } from "@/context/authContext";
import { Button } from "@react-navigation/elements";
import { OrderItem } from "@/types/order";

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: Product;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onClose,
  product,
}) => {
  const [productData, setProductData] = useState({
    title: product.title,
    price: product.price.toString(),
    image: product.image,
    isAvailable: product.isAvailable,
  });

  const { user } = useAuth();
  const { data: order } = useOrder(user!._id);

  const inCart = () => {
    const res = !order?.items.some((it) => {
      if (it.product._id === product._id) {
        return true;
      }
    });
    return res;
  };

  const quantity = useMemo(() => {
    const item = order?.items.find((it) => {
      return it.product._id === product._id;
    });
    return item?.quantity ?? 0;
  }, [order, product._id]);

  const addMutation = useAddProduct(user!._id);
  const decMutation = useDecreaseProduct(user!._id);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalBody}>
            <Image
              source={{ uri: product.image }}
              style={{ width: 312, height: 270, borderRadius: 7 }}
            />
            <Text style={styles.inputLabel}>{productData.title}</Text>

            <Text style={styles.inputLabel}>{productData.price}$</Text>
          </ScrollView>

          <View style={styles.modalFooter}>
            {product.isAvailable === true ? (
              inCart() ? (
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => addMutation.mutate(product._id)}
                >
                  <Text style={styles.Button}>add to order </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.Button}>
                  <TouchableOpacity
                    onPress={() => decMutation.mutate(product._id)}
                  >
                    <Text style={styles.decreaseBtn}>-</Text>
                  </TouchableOpacity>

                  <Text style={styles.quantity}> {quantity} </Text>

                  <TouchableOpacity
                    onPress={() => addMutation.mutate(product._id)}
                  >
                    <Text style={styles.decreaseBtn}>+</Text>
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <TouchableOpacity style={styles.notAvailable} disabled={true}>
                <Text style={styles.submitButtonText}>Not Available</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    maxHeight: "80%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E9ECEF",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  quantity: {
    padding: 10,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  decreaseBtn: {
    fontSize: 20,
    width: 40,
    borderRadius: 7,
    fontWeight: "bold",
    borderWidth: 2,
    textAlign: "center",
    color: "#fff",
    borderColor: "#fff",
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1A1A1A",
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#F8F9FA",
    color: "#1A1A1A",
  },
  availabilityToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
    color: "#333",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#E9ECEF",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginRight: 8,
    alignItems: "center",
  },
  Button: {
    borderRadius: 12,
    paddingInline: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
    flexDirection: "row",
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#10c200ff",
    marginRight: 10,
  },
  notAvailable: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9ECEF",
    marginRight: 8,
    alignItems: "center",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#ff3131ff",
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginLeft: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
