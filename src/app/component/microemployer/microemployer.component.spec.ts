import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicroemployerComponent } from './microemployer.component';

describe('MicroemployerComponent', () => {
  let component: MicroemployerComponent;
  let fixture: ComponentFixture<MicroemployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MicroemployerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicroemployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
