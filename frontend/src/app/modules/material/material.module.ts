import { MatSelectModule } from '@angular/material/select'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { NgModule } from '@angular/core'
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatTooltipModule } from '@angular/material/tooltip'

const materialModules: any = [
  MatFormFieldModule,
  FormsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatTooltipModule,
  MatSelectModule,
]
@NgModule({
  declarations: [],
  imports: materialModules,
  exports: materialModules,
})
export class MaterialModule {}
