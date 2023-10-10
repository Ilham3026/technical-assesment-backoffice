import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Form } from '../../module/form';
import { Menu } from '../../module/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ...Form, ...Menu],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  breadcrumbs: MenuItem[] = [
    { label: 'Master' },
    { label: 'Setup Claim Type' },
    { label: 'Direct Payment' }
  ];
  home: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/main/dashboard',
  };

}
