import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResultAdminComponent } from './add-result-admin.component';

describe('AddResultAdminComponent', () => {
  let component: AddResultAdminComponent;
  let fixture: ComponentFixture<AddResultAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddResultAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResultAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
