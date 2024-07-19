import { Component } from '@angular/core';
import { ForexComponent } from './components/forex/forex.component';
import { HistoryComponent } from "./components/history/history.component";
import { Operation } from './models/operation.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ForexComponent, HistoryComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {

  operations: Operation[] = [];

  onOperation(operation: Operation): void {
    let operations = this.operations;
    operations.unshift(operation);
    this.operations = operations.splice(0,5);
  }
}
