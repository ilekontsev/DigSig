import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-public-key',
  templateUrl: './public-key.component.html',
  styleUrls: ['./public-key.component.scss'],
})
export class PublicKeyComponent implements OnInit {
  showUsers = [];
  dataUsers = [];
  constructor(private _apiService: ApiService, private _stateService: StateService) {}

  ngOnInit(): void {
    this._apiService.getAllPublicKey().subscribe((data) => {
      this.showUsers = data;
      this.dataUsers = data;
    });
    this.filterItem()
  }



  filterItem() {
    this._stateService.search$.subscribe(res => {
    let inputWord = res
    if(!inputWord.trim()){
      this.showUsers = this.dataUsers
      return;
    }
    const regExp = new RegExp(inputWord, 'gi')
    //filters array: if even one of value of object matches by regExp => item will be added
    this.showUsers = this.dataUsers.filter((item) =>
      Object.keys(item.user).reduce((prev, key) => {
        return prev || item.user[key] && item.user[key]?.match(regExp);
      }, false)
    );
    })

  }
}
