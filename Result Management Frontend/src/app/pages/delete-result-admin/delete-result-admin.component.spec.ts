import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteResultAdminComponent } from './delete-result-admin.component';

describe('DeleteResultAdminComponent', () => {
  let component: DeleteResultAdminComponent;
  let fixture: ComponentFixture<DeleteResultAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteResultAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteResultAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
