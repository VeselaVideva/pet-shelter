import { Component, OnInit } from '@angular/core';
import { Pet } from "../../models/pet.model";
import { RealtimeDbService } from "../../services/realtime-db/realtime-db.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  pet: Pet = new Pet();
  submitted = false;

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl('', [Validators.required, Validators.min(0)]),
    breed: new FormControl('', Validators.required),
    description: new FormControl('', [Validators.required, Validators.minLength(50)])
  });

  constructor(private petService: RealtimeDbService) { }

  ngOnInit(): void { }

  get name() { return this.createForm.get('name'); }

  get age() { return this.createForm.get('age'); }

  get breed() { return this.createForm.get('breed'); }

  get description() { return this.createForm.get('description'); }

  submit() {
    if (!this.createForm.valid) { return; }

    this.pet = this.createForm.value;

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
