import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../../../controller/service/formulaire/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RoleService} from '../../../../../controller/service/formulaire/Role.service';
import {TokenService} from '../../../../../controller/service/formulaire/Token.service';
import {User} from '../../../../../controller/model/formulaire/User.model';
import {environment} from '../../../../../../environments/environment';

@Component({
  selector: 'app-user-app-view',
  templateUrl: './user-app-view.component.html',
  styleUrls: ['./user-app-view.component.scss']
})
export class UserAppViewComponent implements OnInit {

  constructor(private userService:UserService, private messageService: MessageService) { }

  ngOnInit(): void {


  }

  // methods
  openNew() {
    this.submitted = false;
    this.userViewDialog = true;
  }


  hideDialog() {
    this.userViewDialog = false;
    this.submitted = false;
  }


  // getters and setters
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

  get userViewDialog(): boolean {
    return this.userService.userViewDialog;
  }

  set userViewDialog(value: boolean){
    this.userService.userViewDialog = value;
  }


  get dateFormat() {
    return environment.dateFormatEdit;
  }

  get dateFormatColumn() {
    return environment.dateFormatList;
  }


}
