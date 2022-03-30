import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { RealtimeDbService } from "../../services/realtime-db/realtime-db.service";
import { UsersService } from "../../services/users/users.service";
import { LoadingService } from "../../services/loading/loading.service";
import { map } from "rxjs";
import { Pet } from "../../models/pet.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  loading$ = this.loader.loading$;
  pets?: Pet[];

  constructor(
    private authService: AuthService,
    private dbService: RealtimeDbService,
    private usersService: UsersService,
    public loader: LoadingService
  ) { }

  ngOnInit(): void {
    this.retrievePets();
  }

  retrievePets(): void {
    this.loader.show();
    this.dbService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.pets = data;
      this.loader.hide();
      console.log(data);
    });
  }
}
