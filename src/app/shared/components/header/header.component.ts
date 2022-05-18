import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
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
  public set value(val) {
    this._value = val;
    this._stateService.search$.next(val);
  }
  public get value() {
    return this._value;
  }
  public login: any;
  public isSearch = false;
  public headerTitle = '';
  private _value = '';
  constructor(
    private _router: Router,
    private _authApiService: AuthApiService,
    private _stateService: StateService
  ) {}

  ngOnInit(): void {
    this._router.events.subscribe((val) => {
      if (val instanceof NavigationStart) {
        if (val.url === '/publicKey') {
          this.isSearch = true;
        } else {
          this.isSearch = false;
        }
      }
    });
    const isCheckRout = window.location.href.split('/').includes('register');
    this.headerTitle = isCheckRout ? 'Login' : 'Registration';

    this.login = this._authApiService.login$;
    if (localStorage.getItem('token')) {
      this._authApiService.login$.next(true);
    }
  }

  redirect() {
    const isCheckRout = window.location.href.includes('/login/register');
    if (isCheckRout) {
      this.headerTitle = 'Registration';
      this._router.navigate(['/login']);
    } else {
      this.headerTitle = 'Login';
      this._router.navigate(['login/register']);
    }
  }

  search(event) {
    this._stateService.search$.next(event);
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
