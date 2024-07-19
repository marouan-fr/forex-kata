import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Operation } from '../../models/operation.model';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html'
})
export class HistoryComponent {
  @Input() operations: Operation[] = []

}
