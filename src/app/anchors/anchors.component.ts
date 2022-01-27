import { Component } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Anchors } from './anchors.common';
import { AnchorsService } from './anchors.service';

@Component({
  templateUrl: './anchors.component.html',
  styleUrls: ['./anchors.component.scss'],
  providers: [
    AnchorsService,
  ]
})
export class AnchorsComponent {
  readonly version = 1.1;

  anchor = '';

  readonly placeholder = 'the quick {colors} [fox, foxes] jumped over the [lazy dog, {dogs}]';

  namedValueSets$ = this.service.getNamedValueSets();

  constructor(
    public service: AnchorsService,
  ) { }

  updateAnchor(anchor: string): void {
    this.anchor = anchor;
    this.anchorSubject$.next(anchor);
  }

  anchorSubject$ = new BehaviorSubject<string>('');
  anchors$ = combineLatest([
    this.anchorSubject$,
    this.namedValueSets$,
  ]).pipe(
    filter(([anchor, namedValueSets]) => !!anchor && !!namedValueSets),
    map(([anchor, namedValueSetDict])  => {
      return Anchors.previewAnchors(anchor, namedValueSetDict);
    }),
  );

}
