import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthApiService } from 'src/app/services/auth-api.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuList = [
    { label: 'Profile', icon: 'account_circle' },
    { label: 'Logout', icon: 'logout' },
  ];
  public iconProfile = 'widgets';
  public value: string = '';
  public login: any;

  public headerTitle = '';

  constructor(
    private _router: Router,
    private _authApiService: AuthApiService,
  ) {
    const isCheckRout = window.location.href.includes('/login/register');
    this.headerTitle = isCheckRout ? 'Sign In' : 'Sign Out';
  }

  ngOnInit(): void {
    this.login = this._authApiService.login$
    if(localStorage.getItem('token')){
      this._authApiService.login$.next(true)
    }
  }

  redirect() {
    const isCheckRout = window.location.href.includes('/login/register');
    if (isCheckRout) {
      this.headerTitle = 'Sign out';
      this._router.navigate(['login']);
    } else {
      this.headerTitle = 'Sign In';
      this._router.navigate(['login/register']);
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
        this._authApiService.login$.next(false);
        this._router.navigate(['login']);
        break;
      default:
        break;
    }
  }
}
