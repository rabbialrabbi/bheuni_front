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
    to: '/'
  },
  { divider: true },
  { header: 'POS' },
  {
    title: 'Leads',
    icon: PackageIcon,
    children: [
      {
        title: 'Lead List',
        icon: CircleIcon,
        to: '/leads'
      },
      {
        title: 'KanBan',
        icon: CircleIcon,
        to: '/leads/kanban'
      }
    ]
  },
  {
    title: 'Application',
    icon: ShoppingBagIcon,
    to: '/applications'
  }
];

export default sidebarItem;
