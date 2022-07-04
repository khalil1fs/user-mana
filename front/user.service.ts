import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from '../../model/formulaire/User.model';
import {environment} from '../../../../environments/environment';
import {MessageService} from 'primeng/api';
import {DateUtils} from '../../../utils/DateUtils';
import {ChercheurVo} from '../../model/formulaire/Chercheur.model';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    // declarations
    readonly API = environment.apiUrl;
    private _userDialogTitle: string = '';
    private _userViewDialog: boolean;
    private _users: User[] = [];
    private _selectedUsers: User[] = [];
    private _userDialog: boolean = false;
    private _user: User = new User();
    private _submitted: boolean;
    private _pilotesDeDonnees : User[] = [];

    constructor(private http: HttpClient, private messageService: MessageService) {
    }

    // methods
    findAll() {
        this.http.get<User[]>(this.API).subscribe(users => {
            this._users = users;
        }, (error: HttpErrorResponse) => {
            console.log(error.error);
        });
    }
    findByUsername(username : string){
        this.http.get<User>(this.API + 'users/username/' + username).subscribe(user=>{
            this._user = user
        }, (error: HttpErrorResponse) => {
            console.log(error.error);
        });
    }

    public findByCriteria(chercheur: ChercheurVo): Observable<Array<User>> {
        return this.http.post<Array<User>>(this.API + 'users/find-all-with-creteria',chercheur);
    }

    findAllPiloteDeDonnees(){
        this.http.get<User[]>(this.API +'users/pilotededonnees/').subscribe(users =>{
            this.pilotesDeDonnees = users;
        }, (error: HttpErrorResponse) => {
            console.log(error.error);
        });
    }

    save(user: User) {
        user.dateArchivage = DateUtils.toDate(user.dateArchivage);
        this.http.post<User>(this.API + 'users/save', user).subscribe(user => {
                this._users = [...this._users, user];
                this.userDialog = false;
                this.user = new User();
            // this.users.push({...user});
        }, (error: HttpErrorResponse) => {
            console.log(error.error);
            if (error.status === 512) {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cette Adress Email deja existe essayer une autre'});
            }
        });
    }

    update(user: User) {
        this.http.put<User>(this.API + 'users/', user).subscribe(user => {
                const index = this._users.findIndex(userToBeFound => user.id == userToBeFound.id);
                index > -1 ? this._users[index] = user : false;
                this.messageService.add({severity: 'success', summary: 'Utilisateur modifié', detail: 'L\'utilisateur a été modifié'});
                this.userDialog = false;
                this.user = new User();
        }, (error: HttpErrorResponse) => {
            console.log(error.error);
            if (error.status === 512) {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Cette Adress Email deja existe essayer une autre'});
            }
        });
    }

    delete(id: string) {
        this.http.delete<number>(this.API + 'users/id/' + id).subscribe(res => {
            res == 1 ? this._users = this._users.filter(user => user.id != id) : false;
        });
    }

    // getters and setters
    get users(): User[] {
        return this._users;
    }

    set users(users: User[]) {
        this._users = users;
    }

    get selectedUsers(): User[] {
        return this._users;
    }

    set selectedUsers(selectedUsers: User[]) {
        this._selectedUsers = selectedUsers;
    }

    get userDialog(): boolean {
        return this._userDialog;
    }

    set userDialog(userDialog: boolean) {
        this._userDialog = userDialog;
    }

    get user(): User {
        return this._user;
    }

    set user(user: User) {
        this._user = user;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(submitted: boolean) {
        this._submitted = submitted;
    }
    get pilotesDeDonnees(): User[] {
        return this._pilotesDeDonnees;
    }

    set pilotesDeDonnees(users: User[]) {
        this._pilotesDeDonnees = users;
    }


    get userDialogTitle(): string {
        return this._userDialogTitle;
    }

    set userDialogTitle(value: string) {
        this._userDialogTitle = value;
    }


    get userViewDialog(): boolean {
        return this._userViewDialog;
    }

    set userViewDialog(value: boolean) {
        this._userViewDialog = value;
    }
}
