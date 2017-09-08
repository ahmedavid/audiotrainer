import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import {AudioProvider} from "ionic-audio";
import {DataService} from "../../providers/data-service/data-service";
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';


@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  counter:number = 0;
  count:number = 0;
  percentage:number = 0;
  disabled=false;

  constructor(
    private toast:ToastController,
    private audio:AudioProvider,
    private dataService:DataService,
    private platform:Platform,
    private transfer: FileTransfer, private file: File
  ) {
  }

  ionViewDidLoad() {
    this.count = this.dataService.modulesData.length;
  }

  async getChapter(chapter:any){
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(chapter){

      console.log("CHAPTER:",chapter)

      const pdfTitle = chapter.pdf.split('/').pop();
      const mp3Title = chapter.mp3.split('/').pop();

      let pdf:any;
      let mp3:any;

      try {
        if(this.platform.is('ios')){
          pdf = await fileTransfer.download(chapter.pdf, this.file.dataDirectory + '/media/' + pdfTitle);
          mp3 = await fileTransfer.download(chapter.mp3, this.file.dataDirectory + '/media/' + mp3Title);
        }
        if(this.platform.is('android')){
          pdf = await fileTransfer.download(chapter.pdf, this.file.externalDataDirectory + '/media/' + pdfTitle);
          mp3 = await fileTransfer.download(chapter.mp3, this.file.externalDataDirectory + '/media/' + mp3Title);
        }



        this.counter++;
        this.percentage = Math.ceil((this.counter/this.count)*100);
        console.log('download complete: ' + pdf.toURL());
        console.log('download complete: ' + mp3.toURL());

        return Promise.resolve(chapter.title+" Downloaded")
      }
      catch (err){
        return Promise.reject(chapter.title+" FAILED!!!!")
      }
    }

    return Promise.reject("Nothing to download....")
  }

  async getChapters(chapters:any[]){
    for(let i=0;i<chapters.length;i++){
      try {
        await this.getChapter(chapters[i])
        if(i==chapters.length-1) return Promise.resolve("Chapters downloaded")
      }
      catch (err){
        console.log("ERROR:",err)
        return Promise.reject("Chapters Download Failed")
      }
    }
  }



  async download(){
    this.disabled=true;
    this.counter = 0;
    this.percentage = 0;
    const chapters = this.dataService.modulesData;
    try {
      const result=await this.getChapters(chapters)
      this.toast.create({message:result,duration: 5000}).present()
    }
    catch (err){
      this.toast.create({message:err,duration: 5000}).present()
    }
    this.disabled=false;
  }

}
