import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';

const LIST_MODULE = [MatBadgeModule, MatDialogModule, MatIconModule, MatMenuModule,MatButtonModule,MatInputModule,MatProgressBarModule,MatProgressSpinnerModule];

@NgModule({
  declarations: [],
  imports: [LIST_MODULE, CommonModule],
  exports: [LIST_MODULE],
})
export class MaterialModule {}
