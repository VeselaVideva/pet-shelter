import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pet } from "../../models/pet.model";
import { RealtimeDbService } from "../../services/realtime-db/realtime-db.service";
import { UsersService } from "../../services/users/users.service";
import { LoadingService } from "../../services/loading/loading.service";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { dbPath } from "../../../environments/environment";

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
  @Output() refreshList: EventEmitter<any> = new EventEmitter();

  currentPet: Pet = {
    name: 'string',
    age: 0,
    breed: 'string',
    description: 'string'
  };
  message = '';

  constructor(
    private dbService: RealtimeDbService,
    private usersService: UsersService,
    public loader: LoadingService,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
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

  updatePet(): void {
    const data = {
      name: this.currentPet.name,
      age: this.currentPet.age,
      description: this.currentPet.description
    };

    if (this.currentPet.key) {
      this.dbService.update(this.currentPet.key, data)
        .then(() => this.message = 'Pet info was updated successfully!')
        .catch(err => console.log(err));
    }
  }

  deletePet(): void {
    if (this.currentPet.key) {
      this.dbService.delete(this.currentPet.key)
        .then(() => {
          this.refreshList.emit();
          this.message = 'This pet was removed!';
        })
        .catch(err => console.log(err));
    }
  }
}
