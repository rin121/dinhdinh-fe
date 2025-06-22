'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, CartSummary, CartContextType, Product, ProductDetail } from '../data/types';

// Cart Actions
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; sizeDetail: ProductDetail; quantity: number } }
  | { type: 'REMOVE_ITEM'; payload: { itemId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { itemId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: { items: CartItem[] } }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'TOGGLE_CART' };

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

// Utility functions
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price).replace('₫', 'đ');
};

const parsePrice = (priceString: string): number => {
  return parseInt(priceString.replace(/[^\d]/g, ''));
};

const generateCartItemId = (productId: number, sizeId: number): string => {
  return `${productId}-${sizeId}`;
};

const calculateSummary = (items: CartItem[]): CartSummary => {
  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // No shipping fee
  const shipping = 0;
  const total = subtotal + shipping;

  return {
    totalItems,
    totalQuantity,
    subtotal,
    subtotalDisplay: formatPrice(subtotal),
    shipping,
    shippingDisplay: formatPrice(shipping),
    total,
    totalDisplay: formatPrice(total)
  };
};

// Cart Reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, sizeDetail, quantity } = action.payload;
      const itemId = generateCartItemId(product.id, sizeDetail.id);
      
      // Check if item already exists
      const existingItemIndex = state.items.findIndex(item => item.id === itemId);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return { ...state, items: updatedItems };
      } else {
        // Add new item
        const newItem: CartItem = {
          id: itemId,
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          productImage: product.image,
          selectedSize: sizeDetail.size,
          selectedSizeId: sizeDetail.id,
          price: typeof sizeDetail.price === 'string' ? parseFloat(sizeDetail.price) : sizeDetail.price,
          priceDisplay: sizeDetail.price_display,
          quantity,
          servings: sizeDetail.servings,
          addedAt: new Date()
        };
        
        return { ...state, items: [...state.items, newItem] };
      }
    }

    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.itemId)
      };
    }

    case 'UPDATE_QUANTITY': {
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== itemId)
        };
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      };
    }

    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }

    case 'LOAD_CART': {
      return { ...state, items: action.payload.items };
    }

    case 'OPEN_CART': {
      return { ...state, isOpen: true };
    }

    case 'CLOSE_CART': {
      return { ...state, isOpen: false };
    }

    case 'TOGGLE_CART': {
      return { ...state, isOpen: !state.isOpen };
    }

    default:
      return state;
  }
};

// Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider Component
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('dinhdinh-cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        // Convert addedAt strings back to Date objects and validate data
        const itemsWithDates = items.map((item: any) => {
          // Validate price is a number
          if (typeof item.price !== 'number' || isNaN(item.price)) {
            console.warn('Invalid price in localStorage, clearing cart:', item);
            throw new Error('Invalid price data');
          }
          return {
            ...item,
            addedAt: new Date(item.addedAt)
          };
        });
        dispatch({ type: 'LOAD_CART', payload: { items: itemsWithDates } });
      } catch (error) {
        console.error('Error loading cart from localStorage, clearing cart:', error);
        localStorage.removeItem('dinhdinh-cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('dinhdinh-cart', JSON.stringify(state.items));
  }, [state.items]);

  // Context value
  const contextValue: CartContextType = {
    items: state.items,
    summary: calculateSummary(state.items),
    isOpen: state.isOpen,
    
    addItem: (product: Product, sizeDetail: ProductDetail, quantity = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, sizeDetail, quantity } });
    },
    
    removeItem: (itemId: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: { itemId } });
    },
    
    updateQuantity: (itemId: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { itemId, quantity } });
    },
    
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' });
    },
    
    // Debug function to force clear everything
    forceClearCart: () => {
      localStorage.removeItem('dinhdinh-cart');
      dispatch({ type: 'CLEAR_CART' });
      console.log('Cart and localStorage cleared');
    },
    
    openCart: () => {
      dispatch({ type: 'OPEN_CART' });
    },
    
    closeCart: () => {
      dispatch({ type: 'CLOSE_CART' });
    },
    
    toggleCart: () => {
      dispatch({ type: 'TOGGLE_CART' });
    }
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

// Hook to use cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 