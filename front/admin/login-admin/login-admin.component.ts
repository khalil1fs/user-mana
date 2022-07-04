import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from 'src/app/controller/service/formulaire/Auth.service';
import {SexeService} from '../../../controller/service/referentiel/Sexe.service';
import {PaysService} from '../../../controller/service/referentiel/Pays.service';
import {RoleService} from '../../../controller/service/formulaire/Role.service';
import {ContinentService} from '../../../controller/service/referentiel/Continent.service';
import {MessageService} from 'primeng/api';

@Component({
    selector: 'app-login-admin',
    templateUrl: './login-admin.component.html',
    styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private authService: AuthService, private sexeService: SexeService,
                private paysService: PaysService, private roleService: RoleService,
                private continentService: ContinentService) {
    }

    ngOnInit(): void {
        this.paysService.findAll(true);
        this.sexeService.findAll(true);
        this.roleService.findAll(true);
        this.continentService.findAll(true);
    }

    submit() {
        const formValues = this.loginForm.value;
        const username = formValues.username;
        const passowrd = formValues.password;
        this.authService.loginAdmin(username, passowrd);

    }
}
