import React from "react";
import { View } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
import { ScreenState } from "../../context/state/screenState";
import CartAction from "./CartAction";
import CartContent from "./CartContent";
import CartInfo from "./CartInfo";

const CartCard = ({
  p,
  cart,
  removeCartMutate,
  addCartmutation,
  updateCheckoutmutation,
}) => {
  const { show } = ScreenState();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View
      style={{
        backgroundColor: "rgba(39, 39, 39,.1)",
        boxShadow: "0 2px 2px 0 rgb(0 0 0 / 10%)",
      }}
    >
      <View style={{ color: "rgb(240, 191, 76)" }}>
        <View style={{ padding: 16 }}>
          <CartInfo p={p} />

          <CartContent
            p={p}
            cart={cart}
            addCartmutation={addCartmutation}
            updateCheckoutmutation={updateCheckoutmutation}
          />
        </View>
      </View>

      {cart && <CartAction showDialog={showDialog} />}

      {cart && (
        <View>
          <Portal>
            <Dialog
              visible={visible}
              onDismiss={hideDialog}
              style={{
                backgroundColor: "rgb(39, 39, 39)",
                maxWidth: show ? 320 : 300,
                marginHorizontal: "auto",
              }}
            >
              <Dialog.Title>Remove Item</Dialog.Title>
              <Dialog.Content>
                <Paragraph>
                  Are you sure you want to remove this item?
                </Paragraph>
              </Dialog.Content>
              <Dialog.Actions
                style={{
                  // backgroundColor: "#ccc",
                  justifyContent: "space-around",
                }}
              >
                <Button onPress={hideDialog} color="rgb(240, 191, 76)">
                  Cancel
                </Button>
                <Button
                  color="rgb(240, 191, 76)"
                  onPress={() => {
                    if (visible) {
                      hideDialog();

                      removeCartMutate({
                        productId: p._id,
                      });
                    }
                  }}
                >
                  Remove
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      )}
    </View>
  );
};

export default CartCard;
