import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRelanceComponent } from './email-relance.component';

describe('EmailRelanceComponent', () => {
  let component: EmailRelanceComponent;
  let fixture: ComponentFixture<EmailRelanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRelanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRelanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
