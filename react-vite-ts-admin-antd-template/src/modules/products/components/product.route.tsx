import { DashOutlined } from "@ant-design/icons";
import ProductsPage from "./ProductsPage";
import type { RouteItem } from "../../../types/route";
export const routesProduct: RouteItem[] = [
    {
        path: '/products',
        label: 'Products',
        key: 'products',
        icon: <DashOutlined />,
        element: <ProductsPage />,
        isShowMenu: true,
        isPrivate: true,
        roles: ['admin', 'user'],
        permissions: ['products.view'],
    }
];
