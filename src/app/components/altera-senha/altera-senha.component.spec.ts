import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlteraSenhaComponent } from './altera-senha.component';

describe('AlteraSenhaComponent', () => {
  let component: AlteraSenhaComponent;
  let fixture: ComponentFixture<AlteraSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteraSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlteraSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
