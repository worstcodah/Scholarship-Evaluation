import { InternComponent } from './../../components/intern/intern.component'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from '../material/material.module'
import { ApiService } from 'src/app/services/api.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [InternComponent],
  exports: [MaterialModule],
  providers: [ApiService],
})
export class WrapperModule {}
