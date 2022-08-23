import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DependantsformComponent } from './dependantsform.component';

describe('DependantsformComponent', () => {
  let component: DependantsformComponent;
  let fixture: ComponentFixture<DependantsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DependantsformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependantsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
