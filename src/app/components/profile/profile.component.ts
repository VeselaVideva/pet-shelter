import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { ImageUploadService } from "../../services/upload/image-upload.service";
import { HotToastService } from "@ngneat/hot-toast";
import { concatMap } from "rxjs";
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from "../../services/users/users.service";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { UserProfile } from "../../models/user-profile";

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$ = this.usersService.currentUserProfile$;

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
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.currentUserProfile$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
      this.profileForm.patchValue({ ...user });
    })
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
}
