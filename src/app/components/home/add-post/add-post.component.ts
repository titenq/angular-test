import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'

import * as firebase from 'firebase/app'
import 'firebase/app'
import {interval, Subject} from 'rxjs'
import {takeUntil} from 'rxjs/operators'
import {ProgressoService} from '../../../services/progresso.service'
import {DatabaseService} from '../../../services/database.service'

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})

export class AddPostComponent implements OnInit {

  @Output() public atualizarTimeline: EventEmitter<any> = new EventEmitter<any>();

  public email: string;
  public imagem: any;
  public mensagem: string;
  public progressoPost: string = 'pendente';
  public porcentagemUpload: number;
  public nomeDaImagem: string = 'Nenhuma Imagem Selecionada.';

  public formPost: FormGroup = new FormGroup({
    'titulo': new FormControl(null),
    'mensagem': new FormControl(null)
  });

  @Input() display: boolean
  @Output() atualizaDisplay = new EventEmitter<boolean>()

  constructor(
    private databaseService: DatabaseService,
    private progressoService: ProgressoService
  ) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email
    })
  }

  public postar(): void {
    this.databaseService.postar({
      email: this.email,
      titulo: this.formPost.value.titulo,
      mensagem: this.formPost.value.mensagem,
      imagem: this.imagem[0]
    });

    let progressoUpload = interval(500);
    let continua = new Subject();

    continua.next(true);

    progressoUpload.pipe(takeUntil(continua))
      .subscribe(() => {

        this.progressoPost = 'andamento';

        this.porcentagemUpload = Math.round((this.progressoService.estado.bytesTransferred / this.progressoService.estado.totalBytes) * 100);

        if (this.progressoService.status === 'concluido') {
          this.progressoPost = 'concluido';

          //emite o EventEmitter para o componente home para atualizar a timeline, que será recebida no template de home
          this.atualizarTimeline.emit();

          //interrompe o takeUntil depois de concluído
          continua.next(false);
        }
      });
    /*let meuModal = element(document).find('#modalAddPost');
    meuModal.modal('hide');*/
  }

  preparaImagemUpload(event: Event): void {
    this.imagem = (<HTMLInputElement>event.target).files
  }

  pegarNomeDaImagem(event: Event) {
    this.nomeDaImagem = (<HTMLInputElement>event.target).files[0].name
  }

  closeDialog() {
    this.display = false
  }

  atualizaDialog() {
    this.atualizaDisplay.emit(false)
    this.closeDialog()
  }
}
