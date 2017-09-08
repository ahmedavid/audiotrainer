import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {HttpModule} from "@angular/http";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import {FileTransfer} from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import { DataService } from '../providers/data-service/data-service';
import {defaultAudioProviderFactory, IonicAudioModule} from "ionic-audio";
import {IonicStorageModule} from "@ionic/storage";
import {PdfPage} from "../pages/pdf/pdf";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {AdMobFree} from "@ionic-native/admob-free";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PdfPage,
    PdfViewerComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PdfPage
  ],
  providers: [
    AdMobFree,
    FileTransfer,
    File,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
