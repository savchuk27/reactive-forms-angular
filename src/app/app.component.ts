import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
import { MyValidators } from './my.validators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  profileForm: FormGroup;
  isValidated = false;
  listOfFrameworks = ['Angular', 'React', 'Vue'];
  frameworksVersion = [];

  ngOnInit() {
    this.formQuestionnaire()
  }

  formQuestionnaire() {
    this.profileForm = new FormGroup({
      firstName:  new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      dateOfBirth: new FormControl(new Date(''), [
        Validators.required
      ]),
      frameworks: new FormControl(['', [
        Validators.required
      ]]),
      frameworkVersion: new FormControl(['', [
        Validators.required
      ]]),
      email: new FormControl('', [
        Validators.email,
        Validators.required,
      ], [MyValidators.uniqEmail]),
      hobby: new FormArray([
        this.buildHobby()
      ], [Validators.required]),
    });
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  }

  get frameworks() {
    return this.profileForm.get('frameworks');
  }

  get frameworkVersion() {
    return this.profileForm.get('frameworkVersion');
  }

  changeFramework(e) {
    this.frameworks.setValue(e.target.value, {
      onlySelf: true
    });
  }

  frameworksChanged(value: any) {
    if (value === 'Angular') {
      this.frameworksVersion = ['1.1.1', '1.2.1', '1.3.3'];
    } else if (value === 'React') {
      this.frameworksVersion = ['2.1.2', '3.2.4', '4.3.1'];
    } else if (value === 'Vue') {
      this.frameworksVersion = ['3.3.1', '5.2.1', '5.1.3'];
    } else {
      this.frameworksVersion = [];
    }
  }

  buildHobby() {
    return new FormGroup(
      {
        name: new FormControl('', Validators.required),
        duration: new FormControl('', Validators.required)
      }
    );
  }

  addHobby() {
    const control = this.buildHobby();
    (this.profileForm.get('hobby') as FormArray).push(control);
  }

  getDeveloperDto() {
    return {
      firstName: this.profileForm.get('firstName').value,
      lastName: this.profileForm.get('lastName').value,
      dateOfBirth: formatDate(this.profileForm.get('dateOfBirth').value, 'd-MM-yyyy', 'en_US' ),
      frameworks: this.profileForm.get('frameworks').value,
      frameworkVersion: this.profileForm.get('frameworkVersion').value,
      email: this.profileForm.get('email').value,
      hobby: this.profileForm.get('hobby').value
    };
  }

  onSubmit() {
    this.isValidated = true;
    if (!this.profileForm.valid) {
      return false;
    } else {
      const dto = this.getDeveloperDto();
      console.log(dto);
      this.profileForm.reset();
    }
  }
}
