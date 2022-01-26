import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-preview-anchors',
  templateUrl: './preview-anchors.component.html',
  styleUrls: ['./preview-anchors.component.scss']
})
export class PreviewAnchorsComponent {
  @Input() anchors: string[] | null = [];
}
