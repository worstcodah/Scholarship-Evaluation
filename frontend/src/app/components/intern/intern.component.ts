import { ApiService } from './../../services/api.service'
import { Component, OnInit } from '@angular/core'
import { Intern } from 'src/app/interfaces/intern'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-intern',
  templateUrl: './intern.component.html',
  styleUrls: ['./intern.component.scss'],
})
export class InternComponent implements OnInit {
  interns: Intern[] = []
  formGroup: FormGroup
  maxDate = new Date()

  picker
  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
  ) {}

  get age() {
    return this.formGroup.controls['age'] as FormControl
  }

  get dateOfBirth() {
    return this.formGroup.controls['dateOfBirth'] as FormControl
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
    })

    this.getInterns().subscribe((next) => {
      this.interns = next
    })
    this.maxDate.setDate(this.maxDate.getDate() - 6575)
  }

  dateChanged() {
    console.log('changed')
    let currentDate = new Date()
    let dateOfBirth = this.dateOfBirth.value as Date

    this.age.setValue(
      Math.floor(
        (Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
        ) -
          Date.UTC(
            dateOfBirth.getFullYear(),
            dateOfBirth.getMonth(),
            dateOfBirth.getDate(),
          )) /
          (1000 * 60 * 60 * 24 * 365),
      ),
    )
    this.age.updateValueAndValidity()
  }

  getInterns() {
    console.log(this.formGroup.value)
    return this.apiService.getInterns()
  }

  createIntern() {
    let intern = this.formGroup.value as Intern
    console.log(intern)
    intern.birthDate.setDate(intern.birthDate.getDate())
    this.apiService.createIntern(intern).subscribe((interns: Intern[]) => {
      this.interns = interns
    })
  }

  updateIntern() {
    this.apiService.updateIntern(
      (this.formGroup.value as Intern).id,
      this.formGroup.value as Intern,
    )
  }

  deleteIntern() {
    this.apiService.deleteIntern((this.formGroup.value as Intern).id)
  }
}
