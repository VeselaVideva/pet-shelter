import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";

import { Pet } from "../../models/pet.model";


@Injectable({
  providedIn: 'root'
})
export class RealtimeDbService {

  private dbPath = '/pets';

  petsRef: AngularFireList<Pet>;

  constructor(private db: AngularFireDatabase) {
    this.petsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Pet> {
    return this.petsRef;
  }

  create(pet: Pet): any {
    return this.petsRef.push(pet);
  }

  update(key: string, value: any): Promise<void> {
    return this.petsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.petsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.petsRef.remove();
  }
}
