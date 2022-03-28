import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr'
import { Intern } from 'src/app/interfaces/intern'
import { ApiService } from 'src/app/services/api.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  interns: Intern[] = []
  filteredInterns: Intern[] = []
  showUpdateForm: boolean = false
  formGroup: FormGroup
  maxDate = new Date()
  searchWord: string = ''
  markedId: string = ''
  searchTypes: string[] = ['Ascending', 'Descending']
  searchType: string = ''
  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) {}

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
    this.getInterns().subscribe((next) => {
      this.filteredInterns = this.interns = next
      console.log(this.interns)
    })
    this.maxDate.setDate(this.maxDate.getDate() - 6575)
  }

  toggleEditForm(intern: Intern) {
    this.showUpdateForm = !this.showUpdateForm
    this.age.setValue(intern.age)
    this.name.setValue(intern.name)
    this.dateOfBirth.setValue(intern.birthDate)
    this.markedId = intern.id
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

  sortAscending(values: Intern[]) {
    return values.sort((one, two) => (one.name > two.name ? 1 : -1))
  }
  sortDescending(values: Intern[]) {
    return values.sort((one, two) => (one.name > two.name ? -1 : 1))
  }

  onFilterChange() {
    if (this.searchWord !== '' && this.searchType !== '') {
      this.filteredInterns = this.interns.filter((intern) =>
        intern.name.toLowerCase().includes(this.searchWord.toLowerCase()),
      )
      if (this.searchType === 'Ascending') {
        this.filteredInterns = this.sortAscending(this.filteredInterns)
      } else {
        this.filteredInterns = this.sortDescending(this.filteredInterns)
      }
    }
  }

  getInterns() {
    return this.apiService.getInterns()
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

  canUpdate(): boolean {
    console.log('Siuu' + this.dateOfBirth.value)
    return (
      this.name.value !== '' &&
      this.age.value !== '' &&
      this.dateOfBirth.value !== ''
    )
  }

  updateIntern(id: string) {
    if (this.canUpdate()) {
      this.apiService
        .updateIntern(id, {
          id: id,
          age: this.age.value,
          name: this.name.value,
          birthDate: this.dateOfBirth.value,
        })
        .subscribe(
          (interns: Intern[]) => {
            this.filteredInterns = this.interns = interns
            this.toastr.success('Update successful !', 'Status')
          },
          (err) => {
            this.toastr.error(err.message, 'Error')
          },
        )
    } else {
      this.toastr.error(
        'You need to enter either the date of birth or the name !',
        'Error',
      )
    }
  }

  deleteIntern(id: string) {
    this.apiService.deleteIntern(id).subscribe(
      (interns: Intern[]) => {
        this.filteredInterns = this.interns = interns
        this.toastr.success('Delete successful !', 'Status')
      },
      (err) => {
        this.toastr.error(err.message, 'Error')
      },
    )
  }
}
