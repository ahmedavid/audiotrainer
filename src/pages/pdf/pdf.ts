import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import {DataService} from "../../providers/data-service/data-service";
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {

  src:any;
  rawSrc:any;
  title:string;
  zoom=1;
  isDevice=false;
  pdf:any;

  constructor(
    private file:File,
    private dataService:DataService,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private platform:Platform) {
    this.isDevice = this.platform.is("cordova");
  }

  ionViewDidLoad() {
    this.rawSrc=this.navParams.get('src');
    this.title=this.navParams.get('title');

    this.loadPdf();
  }

  async loadPdf(){
    const fileName = this.rawSrc.split('/').pop();

    console.log("SRC:",fileName)

    try{
      const result = await this.dataService.checkFile(fileName)

      if(result){
        this.src=this.file.externalDataDirectory + '/media/' + fileName;
      }
    }
    catch (err){
      this.src=this.rawSrc
    }
  }

  onDissmis(){
           this.viewCtrl.dismiss()
  }

  zoomOut(){
    if(this.zoom<2){
      this.zoom+=0.2;
    }
  }
  zoomIn(){
    if(this.zoom>0.5){
      this.zoom-=0.2;
    }
  }

}
