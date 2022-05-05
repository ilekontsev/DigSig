import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor() {}
  settingsList: any[] = [
    {title: 'Open key', info: '**********************'},
    {title: 'Term Secret key', info: 'Infinity'},
    {title: 'Number of signed files', info: 1},
  ];

  deviceList = [
    {title: 'Windows', info: '192.168.1.1'},
    {title: 'Apple phone', info: '192.168.1.1'},
  ]

  ngOnInit(): void {}
}
