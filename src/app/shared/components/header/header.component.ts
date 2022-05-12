import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

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
  public login: any;
  headerTitle = 'Sign out';
  constructor(private _router: Router, private _apiService: ApiService) {}

  ngOnInit(): void {
    this.redirect();
    this.login = this._apiService.login;
  }

  redirect() {
    if (this._router.url === '/login') {
      this.headerTitle = 'Sign in';
      this._router.navigateByUrl('/login/register');
    }
    if (this._router.url === '/register') {
      this.headerTitle = 'Sign out';
      this._router.navigateByUrl('/login');
    }
  }

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
