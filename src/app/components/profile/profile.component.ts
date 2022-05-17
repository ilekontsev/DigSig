import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/shared/services/state.service';
import { GenerateKeyComponent } from '../dialogs/generate-key/generate-key.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private _dialog: MatDialog, private _stateService: StateService, private _apiService: ApiService) {}
  settingsList: any[] = [
    { title: 'Open key', info: '**********************' },
    { title: 'Number of signed files', info: 0 },
  ];

  ngOnInit(): void {
this._apiService.getPublicKey().subscribe(key =>  this.settingsList[0].info = key)
    this._stateService.publicKey$.subscribe(key => this.settingsList[0].info = key)


  }

  generateKey() {
    const dialogRef = this._dialog.open(GenerateKeyComponent, {});

    dialogRef
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        console.log('The dialog was closed');
      });
  }
}
