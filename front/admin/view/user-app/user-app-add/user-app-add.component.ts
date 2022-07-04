import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../controller/service/formulaire/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RoleService} from '../../../../../controller/service/formulaire/Role.service';
import {User} from '../../../../../controller/model/formulaire/User.model';
import {Role} from '../../../../../controller/model/formulaire/Role.model';
import {TokenService} from '../../../../../controller/service/formulaire/Token.service';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-user-app-add',
  templateUrl: './user-app-add.component.html',
  styleUrls: ['./user-app-add.component.scss']
})
export class UserAppAddComponent implements OnInit {

  readonly emailValidationRegex  = environment.emailValidation;


  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  // methods
  openNew() {
    this.submitted = false;
    this.userDialog = true;
  }
  editUser(user: User) {
    this.user = {...user};
    this.user.password = null;
    this.userDialog = true;
  }
  hideDialog() {
    this.userDialog = false;
    this.submitted = false;
  }

  // pilot + admin
  saveUser() {
    if (this.emailValidationRegex.test(this.user.email)) {
      if (this.user.password == this.user.confirmPassword) {
        this.submitted = true;
        // this.user.roles[0].authority = 'ROLE_ADMIN';
        this.user.roles[0]="ROLE_ADMIN";
        this.userService.save(this.user);
        // this.userDialog = false;
        // this.user = new User();
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Mot de passe ne Correspond pas a la Confirmation'});
      }
    }else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'l\'Email Principal ne Correspond pas a la forme XXXX@ird.fr'})
    }
  }

  editUserSubmit(){
    if (this.emailValidationRegex.test(this.user.email)) {
      if (this.user.password === this.user.confirmPassword) {
        this.submitted = true;
        this.user.roles[0].authority = 'ROLE_ADMIN';
        this.userService.update(this.user)
        // this.userDialog = false;
        // this.user = new User();
      } else {
        this.messageService.add({severity: 'error', summary: 'Error', detail: 'Mot de passe ne Correspond pas a la Confirmation'});
      }
    }else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'l\'Email Principal ne Correspond pas a la forme XXXX@ird.fr'})
    }
  }


  // getters and setters


  get dateFormat() {
    return environment.dateFormatCreate;
  }

  get dateFormatColumn() {
    return environment.dateFormatCreate;
  }

  get users():User[]{
    return this.userService.pilotesDeDonnees;
  }
  set users(users:User[]){
    this.userService.pilotesDeDonnees = users;
  }


  get selectedUsers():User[]{
    return this.userService.selectedUsers;
  }
  set selectedUsers(selectedUsers:User[]){
    this.userService.selectedUsers = selectedUsers;
  }

  get userDialog():boolean{
    return this.userService.userDialog;
  }
  set userDialog(userDialog:boolean){
    this.userService.userDialog = userDialog;
  }

  get user():User{
    return this.userService.user;
  }
  set user(user:User){
    this.userService.user = user;
  }
  get submitted():boolean{
    return this.userService.submitted;
  }
  set submitted(submitted:boolean){
    this.userService.submitted = submitted;
  }

  get userDialogTitle(): string {
    return this.userService.userDialogTitle;
  }

  set userDialogTitle(value: string){
    this.userService.userDialogTitle = value;
  }


}
