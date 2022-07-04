import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRelanceDetailsComponent } from './email-relance-details.component';

describe('EmailRelanceDetailsComponent', () => {
  let component: EmailRelanceDetailsComponent;
  let fixture: ComponentFixture<EmailRelanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRelanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRelanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
