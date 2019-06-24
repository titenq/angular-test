import {Component, OnInit, ViewChild} from '@angular/core';

import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('posts', {static: true}) public posts: any;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public logout(): void {
    this.authService.logout();
  }

  public atualizarTimeline(): void {
    this.posts.atualizarTimeline();
  }
}
