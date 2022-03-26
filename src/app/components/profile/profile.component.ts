import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth/auth.service";
import { ImageUploadService } from "../../services/image-upload.service";
import { HotToastService } from "@ngneat/hot-toast";
import { concatMap } from "rxjs";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user$ = this.authService.currentUser$;

  constructor(
    private authService: AuthService,
    private ImageUploadService: ImageUploadService,
    private toast: HotToastService
  ) { }

  ngOnInit(): void { }

  uploadImage(event: any, user: any) {
    this.ImageUploadService
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.toast.observe({
          success: 'Image uploaded successfully!',
          loading: 'Image is being uploaded...',
          error: 'There was an error while uploading!'
        }),
        concatMap((photoURL: any) => this.authService.updateProfileData({ photoURL }))
      ).subscribe();
  }
}
