import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase/app';
import {DatabaseService} from '../../../services/database.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  public email: string
  public posts: any

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
      this.atualizarTimeline()
    })
  }

  public atualizarTimeline(): void {
    this.databaseService.consultarPosts(this.email)
      .then((posts: any) => {
        this.posts = posts
      })
  }
}
