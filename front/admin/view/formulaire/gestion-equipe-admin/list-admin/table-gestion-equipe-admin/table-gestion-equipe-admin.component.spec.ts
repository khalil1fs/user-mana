import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGestionEquipeAdminComponent } from './table-gestion-equipe-admin.component';

describe('TableGestionEquipeAdminComponent', () => {
  let component: TableGestionEquipeAdminComponent;
  let fixture: ComponentFixture<TableGestionEquipeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableGestionEquipeAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableGestionEquipeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
