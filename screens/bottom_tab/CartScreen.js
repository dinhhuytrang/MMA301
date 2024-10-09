import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { getAllCart } from '../../services/ListProductAPI';
import { useFocusEffect } from '@react-navigation/native';
const CartScreen = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const shippingCost = 8000; 

  useFocusEffect(
    React.useCallback(() => {
      const fetchCart = async () => {
        try {
          const response = await getAllCart();  // Fetch cart data again when screen is focused
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };
  
      fetchCart();
  
    }, [])
  );

  const handleQuantityChange = (id, type) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        if (type === 'increase') {
          item.quantity += 1;
        } else if (type === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleRemoveAll = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => {
    const priceWithoutDots = item.price.replace(/\./g, ''); 
    const numericPrice = parseFloat(priceWithoutDots); 
    return sum + numericPrice * item.quantity;
  }, 0);
  const total = subtotal + shippingCost;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  const renderCartItems = () => {
    return (
      <>
        {cart.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemInfo}>Size - {item.size} | Color - {item.color}</Text>
              <Text style={styles.itemPrice}>
                {formatCurrency(parseFloat(item.price.replace(/\./g, '')) * item.quantity)}
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'decrease')}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => handleQuantityChange(item.id, 'increase')}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </>
    );
  };

  const renderEmptyCart = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>CART IS EMPTY</Text>
        <TouchableOpacity style={styles.exploreButton} onPress={() => navigation.navigate('ListProduct')}>
          <Text style={styles.exploreButtonText}>Explore Products</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="chevron-back-outline" size={30} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>My Cart</Text>
      </View>

      <View>
        <TouchableOpacity onPress={handleRemoveAll}>
          <Text style={styles.removeAll}>Remove All</Text>
        </TouchableOpacity>
      </View>

      {cart.length === 0 ? renderEmptyCart() : renderCartItems()}

      {/* Summary Section */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Subtotal</Text>
        <Text style={styles.summaryText}>{formatCurrency(subtotal)}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Shipping Cost</Text>
        <Text style={styles.summaryText}>{formatCurrency(shippingCost)}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>Tax</Text>
        <Text style={styles.summaryText}>{formatCurrency(0)}</Text>
      </View>

      <View style={styles.summary}>
        <Text style={styles.summaryTotalText}>Total</Text>
        <Text style={styles.summaryTotalText}>{formatCurrency(total)}</Text>
      </View>

      {/* Coupon input and Checkout button */}
      <View style={styles.couponContainer}>
        <TextInput
          style={styles.couponInput}
          placeholder="Enter Coupon Code"
          value={couponCode}
          onChangeText={setCouponCode}
        />
        <TouchableOpacity style={styles.applyCouponButton}>
          <Text style={styles.applyCouponText}>→</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  navBar: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginLeft: -30,
  },
  removeAll: {
    color: 'white',
    fontWeight: 'bold',
    display: 'flex',
    alignSelf: 'flex-end',
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "black",
    borderRadius: 5,
    padding: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemInfo: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 24,
    paddingHorizontal: 10,
    color: 'purple',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  summaryTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  couponContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 10,
  },
  couponInput: {
    flex: 1,
    fontSize: 16,
  },
  applyCouponButton: {
    paddingHorizontal: 10,
  },
  applyCouponText: {
    fontSize: 20,
    color: 'purple',
  },
  checkoutButton: {
    backgroundColor: 'purple',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exploreButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  exploreButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;
