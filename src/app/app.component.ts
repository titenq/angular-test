import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'instaclone';

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyDNmZG_eqjnFWV1Io2EdJ7qm9c_eoMsumY',
      authDomain: 'projeto-instaclonepro.firebaseapp.com',
      databaseURL: 'https://projeto-instaclonepro.firebaseio.com',
      projectId: 'projeto-instaclonepro',
      storageBucket: 'projeto-instaclonepro.appspot.com',
      messagingSenderId: '254924287016',
      appId: '1:254924287016:web:c33b30d96b43a385'
    };

    firebase.initializeApp(firebaseConfig);
  }
}
