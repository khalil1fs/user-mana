import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { Role } from 'src/app/controller/model/formulaire/Role.model';
import { User } from 'src/app/controller/model/formulaire/User.model';
import { RoleService } from 'src/app/controller/service/formulaire/Role.service';
import { UserService } from 'src/app/controller/service/formulaire/user.service';

@Component({
  selector: 'app-pilote-de-donnees-list',
  templateUrl: './pilote-de-donnees-list-admin.component.html',
  styleUrls: ['./pilote-de-donnees-list-admin.component.scss']
})
export class PiloteDeDonneesListAdminComponent implements OnInit {
  // declarations 
  constructor(private userService:UserService,private messageService: MessageService, private confirmationService: ConfirmationService,private roleService:RoleService) { }

  ngOnInit(): void {
    this.roleService.findAll();
    this.userService.findAll();
    this.userService.findAllPiloteDeDonnees();
  }

  // methods 
    openNew() {
        this.user = new User();
        this.submitted = false;
        this.userDialog = true;
    }
  editUser(user: User) {
      this.user = {...user};
      this.userDialog = true;
    }
     hideDialog() {
        this.userDialog = false;
        this.submitted = false;
    }
    saveUser() {
        this.submitted = true;
        console.log(this.user);
        this.user.roles[0]="ROLE_ADMIN";
        this.user.passwordChanged=true;
        this.userService.save(this.user)
        this.userDialog = false;
    }
    editUserSubmit(){
           this.submitted = true;
           console.log("before update")
           console.log(this.user)
           this.userService.update(this.user)
           this.userDialog = false;
           this.messageService.add({severity:'success', summary:'Utilisateur modifié', detail:'L\'utilisateur a été modifié'});

    }
    deleteUser(user: User) {
        this.confirmationService.confirm({
            message: 'Voulez vous supprimez ' + user.prenom+" "+user.nom + ' ?',
            header: 'Confirmer',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.userService.delete(user.id);
                this.messageService.add({severity:'success', summary: 'Succès', detail: 'Pilote de Donnés supprimé', life: 3000});
            }
        });
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
      get roles():Role[]{
    return this.roleService.roles;
  }
  set role(roles:Role[]){
    this.roleService.roles =roles;
  }

}
