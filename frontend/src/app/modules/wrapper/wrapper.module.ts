import { MatTooltipModule } from '@angular/material/tooltip'
import { MatButtonModule } from '@angular/material/button'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { MaterialModule } from '../material/material.module'
import { ApiService } from 'src/app/services/api.service'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ToastrModule } from 'ngx-toastr'
import { HomeComponent } from 'src/app/components/home/home.component'
import { AddInternComponent } from 'src/app/components/add-intern/add-intern.component'
import { RouterModule } from '@angular/router'
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTooltipModule,
    ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
      progressAnimation: 'increasing',
      newestOnTop: true,
    }),
  ],
  declarations: [HomeComponent, AddInternComponent],
  exports: [MaterialModule],
  providers: [ApiService],
})
export class WrapperModule {}
