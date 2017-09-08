import {Component, ViewChild} from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {AudioProvider, IAudioTrack} from "ionic-audio";
import {Content, ModalController} from "ionic-angular";
import {PdfPage} from "../pdf/pdf";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  module:any;
  current:IAudioTrack;

  constructor(private dataService:DataService,private audio:AudioProvider,private modalCtrl:ModalController) {

  }

  ionViewDidLoad(){
    this.dataService.ModulesObservable.subscribe(()=>{
      this.module = this.dataService.getModule();
      console.log("MODULE :", this.module)
    });

    this.module = this.dataService.getModule();
  }

  openDoc(index){
    this.modalCtrl.create(PdfPage,{src:this.module[index].pdf}).present();
  }

  play(track){
    this.content.resize();
    if(track.isPlaying){
      this.audio.tracks.forEach(track=>track.stop())
    }
    else{
      this.audio.tracks.forEach(track=>track.stop())
      this.current = track;
      this.audio.play(this.audio.tracks.indexOf(track))
    }

  }
}
