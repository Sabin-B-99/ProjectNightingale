import { Injectable } from '@angular/core';
import {ChordRoot} from "../models/chord-model/chord-root-model/chord-root";
import {ChordKey} from "../models/chord-model/chord-key-model/chord-key";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IChordKey, IChordRoot} from "../types/song-interfaces";

@Injectable({
  providedIn: 'root'
})
export class ChordService {

  constructor(private http: HttpClient) { }

  getRootNotes(): Observable<ChordRoot[]>{
    return  this.http.get<IChordRoot[]>('http://localhost:8080/ProjectNightingale/api/chords/chord-roots/')
      .pipe( map((chordRoots: IChordRoot[]) =>{
          const loadedChordRoots: ChordRoot[] = [];
          for (let chordRoot of chordRoots){
            loadedChordRoots.push(new ChordRoot(chordRoot.rootOrder, chordRoot.rootName));
          }
          return loadedChordRoots;
        }
      ))
  }

  getKeys(): Observable<ChordKey[]>{
    return this.http.get<IChordKey[]>('http://localhost:8080/ProjectNightingale/api/chords/chord-keys/')
      .pipe( map( (chordKeys: IChordKey[]) =>{
        const loadedKeys: ChordKey[] = [];
        for (let chordKey of chordKeys){
          loadedKeys.push(new ChordKey(chordKey.id, chordKey.keyName))
        }
        return loadedKeys;
      }))
  }

  public loadChordImage(chordRoot: ChordRoot, chordKey: ChordKey): Observable<Blob>{
    let imageURL: string = `http://localhost:8080/ProjectNightingale/api/chords/${chordRoot.rootOrder}/${chordKey.id}/image`;
    return this.http.get(imageURL, {responseType: "blob"});
  }

  public loadChordRootByRootName(rootName: string){
    return this.http.get<IChordRoot>(`http://localhost:8080/ProjectNightingale/api/chords/chord-roots/roots/${rootName}`);
  }

  public loadChordKeyByKeyName(keyName: string){
    return this.http.get<IChordKey>(`http://localhost:8080/ProjectNightingale/api/chords/chord-keys/keys/${keyName}`);
  }
}
