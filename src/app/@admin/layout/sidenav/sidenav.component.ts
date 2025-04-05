import { Component, OnInit } from '@angular/core';
import { ArrayDataSource } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';

interface MenuItem {
  name: string;
  url?: string;
  iconName?: string;
  children?: MenuItem[];
}

const TREE_DATA: MenuItem[] = [
  {
    name: 'Dashboard',
    iconName: 'dashboard',
    url: '/admin'
  },
  {
    name: 'Users',
    iconName: 'person',
    children: [
      {
        name: 'User list',
        url: '/admin/users'
      },
      {
        name: 'Add user',
        url: '/admin/users/add-user'
      }
    ]
  },
  {
    name: 'Products',
    iconName: 'storage',
    children: [
      {
        name: 'Product List',
        url: '/admin/products'
      },
      {
        name: 'Add Product',
        url: '/admin/products/add-product'
      }
    ]
  },
  {
    name: 'Categories',
    iconName: 'category',
    children: [
      {
        name: 'Categories',
        url: '/admin/categories'
      },
      {
        name: 'Add category',
        url: '/admin/categories/add-new'
      }
    ]
  },
  {
    name: 'Carts',
    iconName: 'shopping_cart',
    url: '/admin/carts'
  },
  {
    name: 'Todos',
    iconName: 'format_list_bulleted',
    url: '/admin/todos'
  },
  {
    name: 'Media',
    iconName: 'image',
    url: '/admin/media/images'
  }
];

@Component({
    selector: 'app-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    standalone: false
})
export class SidenavComponent implements OnInit {
  treeControl = new NestedTreeControl<MenuItem>(node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: MenuItem) => !!node.children && node.children.length > 0;

  constructor() {}

  ngOnInit(): void {}
}
