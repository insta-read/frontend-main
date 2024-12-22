import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SharedEventModel } from 'projects/common/src/lib/models/SharedEventModel';

//More about sharedService: http://stackoverflow.com/a/36174340/3955513
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  subject = new Subject<SharedEventModel>();

  constructor() {}

  broadcast(event: SharedEventModel) {
    this.subject.next(event);
  }

  on(event_name: string, callback: any) {
    return this.subject
      .pipe(filter((x) => x.name === event_name))
      .subscribe(callback);
  }
}
