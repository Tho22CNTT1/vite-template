import type { RouteItem } from '../types/route';
import { routesDashboard } from './dashboard.route';
import { routesAuth } from './auth.route';
import { routesProduct } from '../modules/product/product.route';
import { routesProducts } from '../modules/products/products.route';
import { routesAdministrator } from './administrator.route';

// Hàm chuyển đổi key thành path
export const generatePath = (key: string) => {
  return key.split('-').join('/');
};

export const routes: RouteItem[] = [
  ...routesDashboard,     // đăng ký route dashboard
  ...routesAuth,          // đăng ký route auth
  ...routesProduct,       // đăng ký route cho product (chi tiết sản phẩm)
  ...routesProducts,      // đăng ký route cho danh sách sản phẩm
  ...routesAdministrator, // đăng ký route cho admin
];
