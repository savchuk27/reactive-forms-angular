import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';

export class MyValidators {
  static uniqEmail(control: FormControl): Promise<{ [key: string]: boolean }> | Observable<{ [key: string]: boolean }> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === 'test@test.test'){
          resolve({
            uniqEmail: true
          });
        }
        else {
          resolve(null);
        }
      }, 2000);
    });
  }
}
