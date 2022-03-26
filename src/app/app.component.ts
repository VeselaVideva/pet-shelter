import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "./services/auth/auth.service";
import { LoadingService } from "./services/loading/loading.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pet Shelter';
  loading$ = this.loader.loading$;

  constructor(
    public authService: AuthService,
    private router: Router,
    public loader: LoadingService,
    private http: HttpClient
  ) { }

  fetchData() {
    this.http.get('https://api.github.com/users/veselavideva')
      .subscribe(res => {
        console.log(res);
      })
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/home']);
    })
  }
}
