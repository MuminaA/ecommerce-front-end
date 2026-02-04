import Admin from '../pages/Admin/Admin';
import AdminProducts from '../pages/Admin/Products';
import AdminOrders from '../pages/Admin/Order';
import AddProduct from '../pages/Admin/AddProducts';
import EditProduct from '../pages/Admin/EditProduct';

export const AdminRoutes = [
    {
        path: '/admin',
        element: <Admin />,
    },
    {
        path: '/admin/products',
        element: <AdminProducts />,
    },
    {
        path: '/admin/products/new',
        element: <AddProduct />,
    },
    {
        path: '/admin/products/:id/edit',
        element: <EditProduct />,
    },
    {
        path: '/admin/orders',
        element: <AdminOrders />,
    },
];