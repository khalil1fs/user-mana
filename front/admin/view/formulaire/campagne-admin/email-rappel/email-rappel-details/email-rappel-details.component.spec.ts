import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailRappelDetailsComponent } from './email-rappel-details.component';

describe('EmailRappelDetailsComponent', () => {
  let component: EmailRappelDetailsComponent;
  let fixture: ComponentFixture<EmailRappelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRappelDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRappelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
