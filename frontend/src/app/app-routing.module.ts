import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddInternComponent } from './components/add-intern/add-intern.component'
import { HomeComponent } from './components/home/home.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  { path: 'add-intern', component: AddInternComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
