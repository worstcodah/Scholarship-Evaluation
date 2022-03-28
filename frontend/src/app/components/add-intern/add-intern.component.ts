import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { Intern } from 'src/app/interfaces/intern'
import { ApiService } from 'src/app/services/api.service'
import { ToastrService } from 'ngx-toastr'
import { Router } from '@angular/router'

@Component({
  selector: 'app-add-intern',
  templateUrl: './add-intern.component.html',
  styleUrls: ['./add-intern.component.scss'],
})
export class AddInternComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
  ) {}
  formGroup!: FormGroup
  maxDate = new Date()

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(25),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      age: ['', [Validators.required]],
      dateOfBirth: ['', Validators.required],
    })
    this.maxDate.setDate(this.maxDate.getDate() - 6575)
  }

  get age() {
    return this.formGroup.controls['age'] as FormControl
  }

  get dateOfBirth() {
    return this.formGroup.controls['dateOfBirth'] as FormControl
  }
  get name() {
    return this.formGroup.controls['name'] as FormControl
  }

  createIntern() {
    this.apiService
      .createIntern({
        age: this.age.value,
        name: this.name.value,
        birthDate: this.dateOfBirth.value,
      })
      .subscribe(() => {
        this.toastr
          .success('Intern added successfully!')
          .onHidden.subscribe(() => {
            this.router.navigateByUrl('home')
          })
      })
  }

  dateChanged() {
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
}
