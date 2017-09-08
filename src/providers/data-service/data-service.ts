import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {File} from "@ionic-native/file";
import {AudioProvider} from "ionic-audio";


@Injectable()
export class DataService {

  ModulesObservable : any;
  ModulesObserver : any;

  modulesData = [];

  constructor(
    private audio:AudioProvider,
    private file:File,
    private http: Http,
    private storage:Storage)
  {

    this.ModulesObservable = Observable.create(observer => {
      this.ModulesObserver = observer;
    });

    this.init();
  }

  private init(){
    this.http.get('assets/audiotrainer.json')
      .subscribe( data => {
        data.json().forEach(d=>this.modulesData.push(d))
        this.ModulesObserver.next();
      })
  }

  getModule(){
    this.getMedia()

    return this.modulesData;

  }

  private async getMedia(){
    if(this.modulesData.length > 0){
      const tracks = this.modulesData

      for(let i=0;i<tracks.length;i++){
        try {
          const fileName = tracks[i].mp3.split('/').pop();
          const path = this.file.externalDataDirectory + "/media/";
          const localFound = await this.checkFile(fileName)
          if(localFound){
            this.audio.create({
              src:path + fileName,
              title:tracks[i].title
            })
          }
        }
        catch (err){
          console.log("Local File Not Found falling back to url:",err)

          this.audio.create({
            src:tracks[i].mp3,
            title:tracks[i].title
          })
        }

      }
      console.log("TRACKS:",this.audio.tracks)
    }
  }

  async checkFile(fileName){
    const path = this.file.externalDataDirectory + "/media/";
    return await this.file.checkFile(path,fileName)

  }

}

