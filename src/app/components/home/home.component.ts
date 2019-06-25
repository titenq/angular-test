import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'

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

  display: boolean = false; //PrimeNG Dialog

  public logout(): void {
    this.authService.logout();
  }

  public atualizarTimeline(): void {
    this.posts.atualizarTimeline();
  }

  //PrimeNG Dialog
  showDialog() {
    this.display = true
  }

  recebeDisplay(novoDisplay) {
    this.display = false
  }
}
