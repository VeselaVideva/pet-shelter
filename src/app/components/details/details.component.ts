import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

import { dbPath } from "../../../environments/environment";
import { Pet } from "../../models/pet.model";

import { UsersService } from "../../services/users/users.service";
import { LoadingService } from "../../services/loading/loading.service";
import { RealtimeDbService } from "../../services/realtime-db/realtime-db.service";


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  loading$ = this.loader.loading$;
  pets?: Pet[];

  @Input() pet?: Pet;

  currentPet: Pet = {
    photoURL: 'string',
    age: 0,
    description: 'string'
  };
  message = '';
  editActive = false;

  createForm = new FormGroup({
    photoURL: new FormControl('', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]),
    age: new FormControl('', [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(50)])
  });

  constructor(
    private dbService: RealtimeDbService,
    private usersService: UsersService,
    public loader: LoadingService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  get photoURL() { return this.createForm.get('photoURL'); }
  get age() { return this.createForm.get('age'); }
  get description() { return this.createForm.get('description'); }

  ngOnInit(): void {
    this.message = '';
    this.retrievePet(this.activatedRoute.snapshot.params['key']);
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentPet = { ...this.pet };
  }

  retrievePet(key: string): void {
    this.http.get(dbPath + `/${key}.json`)
      .subscribe(res => {
        this.pet = res;
      })
  }

  showEditForm(): void {
    this.editActive = true;
  }

  hideEditForm(): void {
    this.editActive = false;
  }

  updatePet(): void {
    if (!this.createForm.valid) { return; }

    this.currentPet = this.createForm.value; //console.log(this.currentPet);

    if (this.activatedRoute.snapshot.params['key']) {
      this.dbService.update(this.activatedRoute.snapshot.params['key'], this.currentPet)
        .then(() => {
          this.message = 'Pet info was updated successfully!'
          this.router.navigate(['/home']);
        })
        .catch(err => console.log(err));
    }
  }

  deletePet(): void {
    if(confirm(`Are you sure you want to remove this pet from the shelter database? Caution: This action is irreversible!`)) {
      if (this.activatedRoute.snapshot.params['key']) {
        this.dbService.delete(this.activatedRoute.snapshot.params['key'])
          .then(() => {
            this.router.navigate([`/home`]);
          })
          .catch(err => console.log(err));
      }
    }
  }
}
