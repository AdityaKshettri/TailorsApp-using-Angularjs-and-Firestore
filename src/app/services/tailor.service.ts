import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Tailor } from '../models/Tailor';

@Injectable({
  providedIn: 'root'
})
export class TailorService {

  tailorsCollection: AngularFirestoreCollection<Tailor>;
  tailorDoc: AngularFirestoreDocument<Tailor>;
  tailors: Observable<Tailor[]>;
  tailor: Observable<Tailor>;

  constructor(private afs: AngularFirestore) {
    this.tailorsCollection = this.afs.collection<Tailor>('tailors')
  }

  getTailors(): Observable<Tailor[]> {
    this.tailors = this.tailorsCollection.snapshotChanges()
      .pipe(map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Tailor;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
    return this.tailors;
  }

  getTailor(id: string): Observable<Tailor> {
    this.tailorDoc = this.afs.doc<Tailor>(`tailors/${id}`);
    this.tailor = this.tailorDoc.snapshotChanges()
      .pipe(map(action => {
        if(action.payload.exists === false) {
          return null;
        }
        else {
          const data = action.payload.data() as Tailor;
          data.id = action.payload.id;
          return data;
        }
      }));
    return this.tailor;
  }

  newTailor(tailor: Tailor) {
    this.tailorsCollection.add(tailor);
  }

  updateTailor(tailor: Tailor) {
    this.tailorDoc = this.afs.doc(`tailors/${tailor.id}`);
    this.tailorDoc.update(tailor);
  }

  deleteTailer(tailor: Tailor) {
    this.tailorDoc = this.afs.doc(`tailors/${tailor.id}`);
    this.tailorDoc.delete();
  }
}
