import Index from '../pages/Index';
import ProductDetails from '../pages/ProductDetails';
import ShoppingCart from '../pages/Cart';
import Checkout from '../pages/Checkout';
import OrderConfirmation from '../pages/OrderConfirmation';

export const publicRoutes = [
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/:id',
    element: <ProductDetails />,
  },
  {
    path: '/cart',
    element: <ShoppingCart />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/order-confirmation',
    element: <OrderConfirmation />,
  },
]