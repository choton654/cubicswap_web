import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Dialog, Icon, Input } from "react-native-elements";
import { ActivityIndicator, Menu } from "react-native-paper";
import { ScreenState } from "../../context/state/screenState";
import Modal from "modal-react-native-web";

function CartContent({ p, cart, addCartmutation, updateCheckoutmutation }) {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        a: {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        },
        b: {
          flexDirection: "row",
          marginHorizontal: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 20%)",
          borderadius: "3px",
          paddingHorizontal: 10,
          paddingVertical: 5,
        },
        c: { marginRight: "8px", fontSize: "20px" },
        d: { width: 50, minWidth: 50, maxWidth: 50 },
      }),
    []
  );

  const { show } = ScreenState();

  const ranges = price => {
    const newRanges = [];
    for (let i = price; i < parseInt(price) + 6; i++) {
      const element = i;
      newRanges.push(element);
    }
    return newRanges;
  };

  const [visible, setVisible] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [orderQty, setOrderQty] = useState(p?.quantity);
  const [newOrderQty, setNewOrderQty] = useState(p?.minOrder?.toString() || "0");

  useEffect(() => {
    if (p?.quantity) {
      setOrderQty(p?.quantity);
    }
  }, [p]);

  const hideDialog = () => {
    setShowDialog(false);
  };
  const hideMenu = () => {
    setVisible(false);
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <>
      <View style={styles.a}>
        <Text style={styles.c}>
          ₹ {p?.rangePerUnit ? p?.rangePerUnit[p?.rangePreUnitIdx]?.pricePerUnit : p?.price}/{p?.unit || "Piece"}
        </Text>

        <View>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            contentStyle={{ backgroundColor: "#eee", width: 80 }}
            anchor={
              <TouchableOpacity onPress={openMenu} style={styles.b}>
                <Text>Qty</Text>
                <Text style={{ marginHorizontal: 5 }}>
                  {addCartmutation.isLoading || updateCheckoutmutation.isLoading ? (
                    <ActivityIndicator animating={true} color={"red"} size={10} />
                  ) : (
                    orderQty
                  )}
                </Text>
                <Icon type='material' name='arrow-drop-down' size={20} />
              </TouchableOpacity>
            }>
            <View style={{ flex: 1 }}>
              {[...ranges(p?.minOrder ? p.minOrder : p?.quantity)].map((q, i) => (
                <Menu.Item
                  key={i}
                  style={{
                    height: 30,
                    minWidth: 80,
                    maxWidth: 80,
                  }}
                  contentStyle={styles.d}
                  titleStyle={{ width: 50, color: "#333" }}
                  onPress={() => {
                    setOrderQty(q);
                    if (cart) {
                      addCartmutation.mutate({
                        productId: p?._id,
                        quantity: parseFloat(q),
                      });
                    } else {
                      updateCheckoutmutation.mutate({
                        productId: p?._id,
                        quantity: parseFloat(q),
                      });
                    }

                    closeMenu();
                  }}
                  title={q}
                />
              ))}
              <Menu.Item
                style={{
                  height: 30,
                  minWidth: 80,
                  maxWidth: 80,
                }}
                contentStyle={{ width: 50, minWidth: 50, maxWidth: 50 }}
                titleStyle={{ width: 50, color: "#333" }}
                title={"more"}
                onPress={() => {
                  setShowDialog(true);
                  hideMenu();
                }}
              />
            </View>
          </Menu>
        </View>
      </View>

      <Dialog
        visible={showDialog}
        onDismiss={hideDialog}
        onBackdropPress={hideDialog}
        ModalComponent={Modal}
        overlayStyle={{ maxWidth: show ? 320 : 300 }}>
        <Dialog.Title title='Enter Quantity' />
        {addCartmutation.isLoading && <Dialog.Loading />}
        <Input
          inputStyle={{ maxWidth: 180 }}
          placeholder={"Quantity"}
          value={newOrderQty}
          keyboardType='numeric'
          errorMessage={Number(newOrderQty) < Number(p.minOrder) ? `min order is ${p.minOrder}` : ""}
          onChangeText={e => {
            // if (!Number(e)) {
            //   return;
            // }
            setNewOrderQty(e);
            // setOrderQty(e);
          }}
        />
        <View style={{ justifyContent: "flex-end", flexDirection: "row" }}>
          <Dialog.Button title='Cancel' onPress={hideDialog} />
          <Dialog.Button
            disabled={addCartmutation.isLoading}
            title='Save'
            onPress={() => {
              if (!Number(newOrderQty)) {
                return;
              }
              if (Number(newOrderQty) < Number(p.minOrder)) {
                return;
              }

              if (cart) {
                addCartmutation.mutate(
                  {
                    productId: p?._id,
                    quantity: parseFloat(newOrderQty),
                  },
                  {
                    onSuccess: () => {
                      hideDialog();
                    },
                  }
                );
              } else {
                updateCheckoutmutation.mutate(
                  {
                    productId: p?._id,
                    quantity: parseFloat(newOrderQty),
                  },
                  {
                    onSuccess: () => {
                      hideDialog();
                    },
                  }
                );
              }
            }}
          />
        </View>
      </Dialog>
    </>
  );
}

export default CartContent;

// {
//   !cart && (
//     <View style={styles.b}>
//       <Text>Total: </Text>
//       <Text>{orderQty}</Text>
//     </View>
//   );
// }
