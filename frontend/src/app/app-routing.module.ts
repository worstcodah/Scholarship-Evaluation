import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { InternComponent } from './components/intern/intern.component'

const routes: Routes = [
  { path: '', redirectTo: 'intern', pathMatch: 'full' },
  {
    path: 'intern',
    component: InternComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
