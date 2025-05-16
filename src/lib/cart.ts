import { CartItem } from "@/redux/features/cart/cartSlice";

export const deliveryFee = 5

export function getCartQuantity(cart: CartItem[]) {
    return cart.reduce((acc, crr) => acc + crr.quantity!, 0)
}


export function getItemQuantity(id: string, cart: CartItem[]) {
    return cart.find(item => item.id === id)?.quantity || 0
}

export function getSubTotal(cart: CartItem[]) {
    return cart.reduce((total, cartItem) => {
        const extrasTotal = cartItem.extras?.reduce((sum, item) => sum + (item.price || 0), 0)

        const itemTotal = cartItem.basePrice + (extrasTotal || 0) + (cartItem.size?.price || 0)

        return total + itemTotal * cartItem.quantity!
    }, 0)
}

export function getTotalAmount(cart: CartItem[]) {
    return (getSubTotal(cart) || 0) + deliveryFee
}