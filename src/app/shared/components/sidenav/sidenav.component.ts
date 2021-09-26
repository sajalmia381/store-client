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
    name: 'Product',
    iconName: 'storage',
    children: [
      {
        name: 'Product List',
        url: '/products'
      },
      {
        name: 'Add Product',
        url: '/products/add-product'
      },
    ]
  },
  {
    name: 'Category',
    iconName: 'category',
    children: [
      {
        name: 'Categories',
        url: '/categories'
      },
      {
        name: 'Add category',
        url: '/categories/add-new'
      },
    ]
  },
  {
    name: 'Users',
    iconName: 'person',
    children: [
      {
        name: 'User list',
        url: '/users'
      },
      {
        name: 'Add user',
        url: '/users/add-user'
      },
    ]
  },
  {
    name: 'Media',
    iconName: 'image',
    url: '/media/images'
  }
];

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  treeControl = new NestedTreeControl<MenuItem> (node => node.children);
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: MenuItem) => !!node.children && node.children.length > 0;

  constructor() { }

  ngOnInit(): void {
  }

}
