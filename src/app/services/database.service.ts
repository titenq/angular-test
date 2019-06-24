import {Injectable} from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/storage';
import {ProgressoService} from './progresso.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private progressoService: ProgressoService) { }

  public postar(post: any): void {

    firebase.database()
      .ref(`posts/${btoa(post.email)}`)
      .push({'titulo': post.titulo, 'mensagem': post.mensagem})
      .then((response: any) => {

        let nomeImg = response.key;

        firebase.storage()
          .ref()
          .child(`imagens/${nomeImg}`)
          .put(post.imagem)
          .on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot: any) => {
              this.progressoService.status = 'andamento';
              this.progressoService.estado = snapshot
            },
            (error) => {
              this.progressoService.status = 'erro';
              console.log(error)
            },
            () => {
              this.progressoService.status = 'concluido'
            })
      });
  }

  public consultarPosts(emailUsuario: string): Promise<any> {

    return  new Promise((resolve, reject) => {

      firebase.database()
        .ref(`posts/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {

          let posts = new Array<any>();

          snapshot.forEach((childSnapshot: any) => {

            let post = childSnapshot.val();
            post.key = childSnapshot.key;
            posts.push(post);
          });
          return posts.reverse();
        })
        .then((posts: any) => {
          posts.forEach((post) => {
            firebase.storage().ref()
              .child(`imagens/${post.key}`)
              .getDownloadURL()
              .then((url: string) => {

                post.url_imagem = url;

                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {

                    post.nome_usuario = snapshot.val().nome_usuario;
                  })
              })
          });
          resolve(posts);
          reject((error: Error) => {
            console.log(error);
          })
        })
    })
  }
}
