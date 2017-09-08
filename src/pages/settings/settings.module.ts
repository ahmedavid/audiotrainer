import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import {ProgressBarComponent} from "../../components/progress-bar/progress-bar";

@NgModule({
  declarations: [
    SettingsPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule {}
