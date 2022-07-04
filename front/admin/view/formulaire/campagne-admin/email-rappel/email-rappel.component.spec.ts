import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmailRappelComponent } from './email-rappel.component';



describe('EmailRappelComponent', () => {
  let component: EmailRappelComponent;
  let fixture: ComponentFixture<EmailRappelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailRappelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailRappelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
