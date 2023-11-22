import { WidgetsProvider } from '@sitecore-discover/react';
import { createTheme } from '@sitecore-discover/ui';
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// eslint-disable-next-line import/extensions
import 'bootstrap/dist/js/bootstrap.bundle.js';
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useEffect, ReactNode } from 'react';
import 'react-notifications-component/dist/theme.css';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import TopMenu from './components/TopMenu';
import { BASE_PATH } from './helpers/constants';
import { CartProvider } from './hooks/cart';
import { WishlistProvider } from './hooks/wishlist';

const HomeView = lazy(() => import('./views/Home'));
const ProductDetailView = lazy(() => import('./views/Product/Detail'));
const CartView = lazy(() => import('./views/Cart/Cart'));
const OrderView = lazy(() => import('./views/Order'));
const NotFoundView = lazy(() => import('./views/pages/404'));
const InternalServerErrorView = lazy(() => import('./views/pages/500'));
const SearchView = lazy(() => import('./views/SearchView'));
const CategoryView = lazy(() => import('./views/CategoryView'));
const WishlistView = lazy(() => import('./views/Wishlist'));

const ScrollToTop = ({ children }: any) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return children;
};

ScrollToTop.propTypes = {
  children: PropTypes.node.isRequired,
};

function App(): JSX.Element {
  const { style, setStyle } = createTheme({
    typography: {
      fontFamilySystem: '"Source Sans Pro", sans-serif',
    },
    palette: {
      primary: {
        main: '#43474c',
        light: '#f1f2f3',
        dark: '#0d0d0d',
      },
    },
  });
  const bodyElement = document.body;
  setStyle(bodyElement, style);

  return (
    <WidgetsProvider
      env="prod"
      customerKey={process.env.REACT_APP_CUSTOMER_KEY}
      apiKey={process.env.REACT_APP_API_KEY}
      useToken
    >
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter basename={BASE_PATH}>
              <div>
                <Header />
                <TopMenu />
                <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
                  <Routes>
                    <Route path="/" element={<HomeView />} />
                    <Route path="/search" element={<SearchView />} />
                    <Route path="/category/*" element={<CategoryView />} />
                    <Route path="/product/detail/:sku/:prodId" element={<ProductDetailView />} />
                    <Route path="/cart" element={<CartView />} />
                    <Route path="/order/confirmation" element={<OrderView />} />
                    <Route path="/500" element={<InternalServerErrorView />} />
                    <Route path="/account/wishlist" element={<WishlistView />} />
                    <Route path="/notfound" element={<NotFoundView />} />
                    <Route path="*" element={<Navigate to="/notfound" />} />
                  </Routes>
                </Suspense>
                <Footer />
              </div>
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </WidgetsProvider>
  );
}

export default App;
