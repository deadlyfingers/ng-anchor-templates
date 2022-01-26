import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { INamedValueSetDict } from './anchors.types';
import TEST_NAMED_VALUE_SETS from './test/named-value-sets.json';

@Injectable({
  providedIn: 'root'
})
export class AnchorsService {

  // returns example json named value sets
  getNamedValueSets(): Observable<INamedValueSetDict> {
    return of(TEST_NAMED_VALUE_SETS);
  }

}
