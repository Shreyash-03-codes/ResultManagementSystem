import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateResultAdminComponent } from './update-result-admin.component';

describe('UpdateResultAdminComponent', () => {
  let component: UpdateResultAdminComponent;
  let fixture: ComponentFixture<UpdateResultAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateResultAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateResultAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
