/* eslint-disable no-console,react/jsx-no-constructed-context-values */
import { PageController, trackAddToWishlistEvent } from '@sitecore-discover/react';

import PropTypes from 'prop-types';
import React, { useContext, useMemo, useReducer } from 'react';
import { WISHLIST_ADD_PRODUCT, WISHLIST_CLEAR, WISHLIST_KEY, WISHLIST_REMOVE_PRODUCT } from '../data/constants';
import { PAGE_EVENTS_DEFAULT } from '../helpers/constants';
import useLocalStorage from './useLocalStorage';

const wishlistReducer = (state: { wishlist: any; }, action: { type: string; payload: any }) => {
  switch (action.type) {
    case WISHLIST_ADD_PRODUCT: {
      const { wishlist } = state;
      return { ...state, wishlist: [...wishlist, { ...action.payload }] };
    }

    case WISHLIST_REMOVE_PRODUCT: {
      const { wishlist } = state;
      const { id } = action.payload;

      return { ...state, wishlist: wishlist.filter((item: { data: { sku: string; }; }) => item.data.sku !== id) };
    }
    case WISHLIST_CLEAR: {
      return { ...state, wishlist: [] };
    }
    default:
      return state;
  }
};

export const WishlistContext = React.createContext({
  wishlist: [],
  isProductInWishlist: (productId: string) => {
    console.log(productId);
    return false;
  },
  addProductToWishlist: (product: any, page: string) => {
    console.log(product, page);
  },
  removeProductFromWishlist: (productId: string) => {
    console.log(productId);
  },
  clearWishlist: () => {},
});

export const WishlistProvider = (props: { children: any; }): JSX.Element => {
  const { children } = props;
  const [savedWishlist, saveWishlist] = useLocalStorage(WISHLIST_KEY, JSON.stringify([]));
  const [state, dispatch] = useReducer(wishlistReducer, {
    wishlist: JSON.parse(savedWishlist),
  });

  React.useEffect(() => {
    saveWishlist(JSON.stringify(state.wishlist));
  }, [state, saveWishlist]);

  const value = useMemo(
    () => ({
      addProductToWishlist: (product: { sku: any; final_price: any; price: any; }, page = PAGE_EVENTS_DEFAULT) => {
        const currentItem = state.wishlist.find((i: any) => i.data.sku === product.sku);
        if (!currentItem) {
          const payload = { data: product };
          dispatch({ type: WISHLIST_ADD_PRODUCT, payload });

          trackAddToWishlistEvent(
            [
              {
                sku: product.sku,
                quantity: 1,
                price: product.final_price,
                priceOriginal: product.price,
              },
            ],
            page,
            PageController.getContext().toJson(),
          );
        }
      },
      removeProductFromWishlist: (productId: any) => {
        const currentItem = state.wishlist.find((i: { data: { sku: any; }; }) => i.data.sku === productId);
        if (currentItem) {
          const payload = {
            id: productId,
          };
          dispatch({ type: WISHLIST_REMOVE_PRODUCT, payload });
        }
      },
      clearWishlist: () => {
        dispatch({ type: WISHLIST_CLEAR, payload: {} });
      },
      isProductInWishlist: (productId: string) => state.wishlist.find((i: { data: { sku: any; }; }) => i.data.sku === productId),
      wishlist: state.wishlist,
    }),
    [state.wishlist],
  );
  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

WishlistProvider.propTypes = {
  children: PropTypes.node,
};

WishlistProvider.defaultProps = {
  children: <></>,
};

export const useWishlist = () => useContext(WishlistContext);
