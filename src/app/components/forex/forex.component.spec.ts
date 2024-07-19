import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForexComponent } from './forex.component';
import { RateService } from '../../services/rate.service';
import { of } from 'rxjs';

describe('ForexComponent', () => {
  let component: ForexComponent;
  let fixture: ComponentFixture<ForexComponent>;
  let rateService: RateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForexComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ForexComponent);
    component = fixture.componentInstance;
    rateService = fixture.debugElement.injector.get(RateService);
    spyOnProperty(rateService, 'rate').and.returnValue(of(1.1));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate value based on rate', () => {
    component.inputControl.setValue(1);
    expect(component.value).toBe(1.1);
  });

  it('should use foced rate', () => {
    component.inputControl.setValue(1);
    component.forceRateControl.setValue(1.12);
    expect(component.value).toBe(1.12);
  });

  it('should use real rate if force rate is more than 2% than rate', () => {
    component.inputControl.setValue(1);
    component.forceRateControl.setValue(1.2);
    expect(component.value).toBe(1.1);
  });

  it('should revert values on switch to USD', () => {
    component.inputControl.setValue(1);
    component.switchControl.setValue(true);
    expect(component.inputControl.value).toBe(1.1);
    expect(component.value).toBe(1);
  });
});
