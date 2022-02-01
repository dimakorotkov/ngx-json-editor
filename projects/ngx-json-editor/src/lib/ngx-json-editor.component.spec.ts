import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxJsonEditorComponent } from './ngx-json-editor.component';

describe('NgxJsonEditorComponent', () => {
  let component: NgxJsonEditorComponent;
  let fixture: ComponentFixture<NgxJsonEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxJsonEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxJsonEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
