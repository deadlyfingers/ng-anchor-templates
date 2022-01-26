import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-anchor',
  templateUrl: './input-anchor.component.html',
  styleUrls: ['./input-anchor.component.scss']
})
export class InputAnchorComponent {
  @Input() value = '';
  @Input() placeholder = '';
  @Output() anchor = new EventEmitter<string>();

  update(event?: Event): void {
    this.anchor.emit(this.value);
  }
}
