import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { RealtimeDbService } from "../../services/realtime-db/realtime-db.service";
import { UsersService } from "../../services/users/users.service";

import { Pet } from "../../models/pet.model";


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  pet: Pet = new Pet();
  submitted = false;

  createForm = new FormGroup({
    photoURL: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl('', [Validators.required, Validators.min(0)]),
    breed: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)]),
    fosterer: new FormControl('', Validators.required)
  });

  constructor(
    private petService: RealtimeDbService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void { }

  get photoURL() { return this.createForm.get('photoURL'); }
  get name() { return this.createForm.get('name'); }
  get age() { return this.createForm.get('age'); }
  get breed() { return this.createForm.get('breed'); }
  get description() { return this.createForm.get('description'); }
  get fosterer() { return this.createForm.get('fosterer'); }

  submit() {
    if (!this.createForm.valid) { return; }

    this.pet = this.createForm.value; //console.log(this.pet);

    this.petService.create(this.pet).then(() => {
      console.log('Added new pet successfully!');
      this.submitted = true;
    });
  }

  newPet(): void {
    this.submitted = false;
    this.pet = new Pet();
  }
}
