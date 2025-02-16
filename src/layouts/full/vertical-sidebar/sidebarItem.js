import {
  CircleIcon,
  KeyIcon,
  DashboardIcon,
  PackageIcon,
  BuildingStoreIcon,
  ShoppingBagIcon
} from 'vue-tabler-icons';


const sidebarItem = [
  { header: 'Dashboard' },
  {
    title: 'Default',
    icon: DashboardIcon,
    to: '/dashboard/default'
  },
  { divider: true },
  { header: 'POS' },
  {
    title: 'Product',
    icon: PackageIcon,
    to: '/product/list'
  },
  {
    title: 'Suppler',
    icon: BuildingStoreIcon,
    to: '/supplier/list'
  },
  {
    title: 'Purchase',
    icon: ShoppingBagIcon,
    children: [
      {
        title: 'Purchase List',
        icon: CircleIcon,
        to: '/purchase/list'
      },
      {
        title: 'Purchase Create',
        icon: CircleIcon,
        to: '/purchase/create'
      }
    ]
  }
];

export default sidebarItem;
