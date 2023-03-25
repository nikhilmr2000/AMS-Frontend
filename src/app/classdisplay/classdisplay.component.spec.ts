import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassdisplayComponent } from './classdisplay.component';

describe('ClassdisplayComponent', () => {
  let component: ClassdisplayComponent;
  let fixture: ComponentFixture<ClassdisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassdisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassdisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
