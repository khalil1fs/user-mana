import {NgModule} from '@angular/core';
import {TableGestionEquipeAdminComponent} from './table-gestion-equipe-admin/table-gestion-equipe-admin.component';
import {ToolsModule} from '../../../../../tools/tools.module';
import {TableModule} from 'primeng/table';
import {CommonModule} from '@angular/common';
import {RippleModule} from 'primeng/ripple';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {SelectBoxSortTableComponent} from '../../../../../tools/select-box-sort-table/select-box-sort-table.component';

@NgModule({
    imports: [ToolsModule, TableModule, CommonModule, RippleModule, ButtonModule, InputTextModule],
    exports: [
        TableGestionEquipeAdminComponent,
        SelectBoxSortTableComponent
    ],
    declarations: [TableGestionEquipeAdminComponent, SelectBoxSortTableComponent]
})
export class GestionEquipeListAdminModule {
}
