import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/shared/services/state.service';
import { DeleteKeyComponent } from '../dialogs/delete-key/delete-key.component';
import { GenerateKeyComponent } from '../dialogs/generate-key/generate-key.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  dataUser: any = {};
  infoUser: any = {};
  constructor(
    private _dialog: MatDialog,
    private _stateService: StateService,
    private _apiService: ApiService
  ) {}
  settingsList: any[] = [
    {
      title: 'Open key',
      info: 'you do not have an electronic digital signature',
      key: false,
    },
    { title: 'Number of signed files', info: 0 },
  ];

  ngOnInit(): void {
    this._apiService.getPublicKey().subscribe((data) => {
      if (data) {
        this.settingsList[0].info = data.key;
        this.settingsList[0].key = true;

        this.settingsList[1].info = data.count;
        this.infoUser = data;
      }
    });
    this._stateService.publicKey$.subscribe((key) => {
      this.settingsList[0].info = key;
      this.settingsList[0].key = true;
      this.settingsList[1].info = 0;
    });

    this._stateService.user$.subscribe((data) => {
      this.dataUser = data;
    });
  }

  generateKey() {
    const dialogRef = this._dialog.open(GenerateKeyComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {});
  }

  deleteKey() {
    const dialogRef = this._dialog.open(DeleteKeyComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {});
  }
}
