import { Component, DestroyRef, EventEmitter, inject, Output } from '@angular/core';
import { RateService } from '../../services/rate.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Operation } from '../../models/operation.model';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RateService],
  templateUrl: './forex.component.html'
})
export class ForexComponent {
  private readonly destroyRef = inject(DestroyRef);

  @Output() onOperation = new EventEmitter<Operation>()

  inputControl = new FormControl<number | null>(null);
  switchControl = new FormControl<boolean>(false);
  forceRateControl = new FormControl<number | null>(null);

  value = 0;
  rate = 0;
  disableForcedRate = true;

  constructor(private rateService: RateService) { }

  ngOnInit(): void {
    this.valuesChanges();
    this.switchToggle();
  }

  private valuesChanges(): void {
    combineLatest({
      value: this.inputControl.valueChanges,
      rate: this.rateService.rate
    }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: ({ value, rate }) => {
        this.rate = rate;
        if (value !== null) {
          const usedRate = this.disableForcedRate ? rate : this.forceRateControl.value!;
          if (this.switchControl.value) {
            this.value = value / usedRate;
          } else {
            this.value = value * usedRate;
          }

          this.onOperation.emit({
            input: value,
            value: this.value,
            switch: this.switchControl.value!,
            rate,
            forcedRate: !this.disableForcedRate ? this.forceRateControl.value! : undefined
          });
        } else {
          this.value = 0;
        }
      }
    });

    this.forceRateControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        if (value && ((value < (this.rate * 1.02)) && (value > (this.rate * 0.98)))) {
          this.disableForcedRate = false;
        } else {
          this.disableForcedRate = true;
        }
        this.inputControl.patchValue(this.inputControl.value)
      }
    })
  }

  private switchToggle(): void {
    this.switchControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: value => {
        this.inputControl.patchValue(this.value);
      }
    });
  }

}
