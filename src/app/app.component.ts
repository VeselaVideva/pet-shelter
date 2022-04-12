import { Component } from '@angular/core';
import { DatePipe } from "@angular/common";
import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

import { switchMap } from "rxjs";

import { APIkey } from "../environments/environment";

import { AuthService } from "./services/auth/auth.service";
import { LoadingService } from "./services/loading/loading.service";
import { UsersService } from './services/users/users.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pet Shelter';

  loading$ = this.loader.loading$;
  user$ = this.usersService.currentUserProfile$;
  date$ = this.datePipe.transform((new Date), 'MM/dd/yyyy');
  time$ = this.datePipe.transform((new Date), 'HH:mm');
  userIP = '';
  userIPInfo: any = [];
  userLocationInfo: any = [];
  flag = ''; // userLocationInfo?.country_flag
  countryName = ''; // userIPInfo?.country_name

  constructor(
    private authService: AuthService,
    private router: Router,
    public loader: LoadingService,
    private http: HttpClient,
    private usersService: UsersService,
    public datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    //this.loadIP();
    this.getIP();
  }

  /*loadIP() {
    this.http.get('https://jsonip.com').pipe(
        switchMap((value: any) => {
          this.userIP = value.ip;
          return this.http.get(`http://api.ipstack.com/${value.ip}?access_key=${geoAPIKey}`);
        })
      ).subscribe((value: any) => {
        this.userIPInfo = value;
        this.userLocationInfo = value.location;
        // console.log(this.userIPInfo);
        // console.log(this.userLocationInfo);
      },
      err => {
        console.log(err);
      }
    );
  }*/

  getIP() {
    this.http.get('https://jsonip.com').pipe(
      switchMap((value: any) => {
        this.userIP = value.ip;
        return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${APIkey}&ip=${value.ip}`);
      })
    ).subscribe((value: any) => {
        this.flag = value.country_flag;
        this.countryName = value.country_name;
        // console.log(value);
      },
      err => {
        console.log(err);
      }
    );
  }

  /*fetchData() {
    this.http.get('https://pet-shelter-e3a18-default-rtdb.europe-west1.firebasedatabase.app/pets.json')
      .subscribe(res => {
        console.log(res);
      })
  }*/

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
