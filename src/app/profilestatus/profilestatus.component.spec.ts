import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilestatusComponent } from './profilestatus.component';

describe('ProfilestatusComponent', () => {
  let component: ProfilestatusComponent;
  let fixture: ComponentFixture<ProfilestatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilestatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilestatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
