import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { ImageUploadService } from "../../services/upload/image-upload.service";
import { HotToastService } from "@ngneat/hot-toast";
import { concatMap, switchMap } from "rxjs";
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from "../../services/users/users.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserProfile } from "../../models/user-profile";
import { APIkey, geoAPIKey } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;
  userIP = '';
  userIPInfo: any = [];
  userLocationInfo: any = [];
  flag = ''; // userLocationInfo?.country_flag
  countryName = ''; // userIPInfo?.country_name
  cityName = ''; // userLocationInfo?.capital
  latitude = ''; // userIPInfo?.latitude
  longitude = ''; // userIPInfo?.longitude

  profileForm = new FormGroup({
    uid: new FormControl(''),
    displayName: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    private ImageUploadService: ImageUploadService,
    private toast: HotToastService,
    private usersService: UsersService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
      this.profileForm.patchValue({ ...user });
    })
    this.loadIP();
    this.getIP();
  }

  uploadImage(event: any, user: UserProfile) {
    this.ImageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          success: 'Image uploaded successfully!',
          loading: 'Image is being uploaded...',
          error: 'There was an error while uploading!'
        }),
        concatMap((photoURL: any) => this.usersService.updateUser({ uid: user.uid, photoURL }))
      ).subscribe();
  }

  saveProfile() {
    const profileData = this.profileForm.value;
    this.usersService
      .updateUser(profileData)
      .pipe(
        this.toast.observe({
          loading: 'Updating data...',
          success: 'Data has been updated!',
          error: 'There was an error while updating the data!'
        })
      ).subscribe();
  }

  loadIP() {
    this.http.get('https://jsonip.com').pipe(
      switchMap((value: any) => {
        this.userIP = value.ip;
        return this.http.get(`http://api.ipstack.com/${value.ip}?access_key=${geoAPIKey}`);
      })
    ).subscribe((value: any) => {
        this.userIPInfo = value;
        this.userLocationInfo = value.location;
      },
      err => {
        console.log(err);
      }
    );
  }

  getIP() {
    this.http.get('https://jsonip.com').pipe(
      switchMap((value: any) => {
        this.userIP = value.ip;
        return this.http.get(`https://api.ipgeolocation.io/ipgeo?apiKey=${APIkey}&ip=${value.ip}`);
      })
    ).subscribe((value: any) => {
        this.flag = value.country_flag;
        this.countryName = value.country_name;
        this.cityName = value.city;
        this.latitude = value.latitude;
        this.longitude = value.longitude;
        // console.log(value);
      },
      err => {
        console.log(err);
      }
    );
  }
}
