import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickMenuComponent } from './quick-menu.component';

describe('QuickMenuComponent', () => {
  let component: QuickMenuComponent;
  let fixture: ComponentFixture<QuickMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
