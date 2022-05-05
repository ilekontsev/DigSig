import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuList = [
    { label: 'Profile', icon: 'account_circle' },
    { label: 'Logout', icon: 'logout' },
  ];
  iconProfile = 'widgets';
  value: string = '';

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  checkStatusMenu(isOpen: boolean) {
    this.iconProfile = isOpen ? 'disabled_by_default' : 'widgets';
  }

  selectMenu(menu: string) {
    switch (menu) {
      case 'Profile':
        this._router.navigate(['profile']);
        break;
      case 'Settings':
        this._router.navigate(['settings']);
        break;
      case 'Logout':
        this._router.navigate(['login']);
        break;
      default:
        break;
    }
  }
}
