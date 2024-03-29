
import { createSlice } from "@reduxjs/toolkit";
import { notification } from 'antd';

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    cartTaxAmount:0,
}
const cartSlices = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                notification.success({
                    message: 'Cart Updated',
                    description: `${state.cartItems[itemIndex].name} quantity increased in the cart.`,
                    duration: 2,
                });
            } else {

                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct)
                notification.success({
                    message: 'Item Added',
                    description: `${action.payload.name} added to the cart.`,
                    duration: 2,
                });

            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },

        removeFromCart(state, action) {
            state.cartItems.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    const nextCartItems = state.cartItems.filter(
                        (item) => item.id !== cartItem.id
                    );

                    state.cartItems = nextCartItems;

                    notification.success({
                        message: 'DELETED',
                        description: `${action.payload.name}remove from cart.`,
                        duration: 2,
                    });
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                return state;
            });
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;
                notification.error({
                    message: 'DELETED',
                    description: `Decreased ${action.payload.name}cart Quntity.`,
                    duration: 2,
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                notification.error({
                    message: 'DELETED',
                    description: `${action.payload.name}removed from cart.`,
                    duration: 2,
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
            // add this line to calculate the tax amount
            state.cartTaxAmount = total * 0.1;
          },
          clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            notification.success({
                message: 'Clear Cart Success',
                // description: `Decreased${action.payload.name}cart Quntity.`,
                duration: 2,
            });
          },


    }
})
export const { addToCart, removeFromCart, decreaseCart,getTotals,clearCart } = cartSlices.actions;
export default cartSlices.reducer;