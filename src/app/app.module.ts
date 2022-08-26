import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerindexComponent } from './customerindex/customerindex.component';
import { HeaderComponent } from './helpers/header/header.component';
import { CustomerformComponent } from './customerindex/customerform/customerform.component';
import { DependantsComponent } from './dependants/dependants.component';
import { DependantsformComponent } from './dependants/dependantsform/dependantsform.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  
    { path: '', component: CustomerindexComponent},
    { path: 'customer', component: CustomerindexComponent},
    { path: 'customer/form', component: CustomerformComponent},
    { path: 'customer/form/:id', component: CustomerformComponent},
    { path: 'dependant/:id', component: DependantsComponent},
    { path: 'newdependant/:customerid', component: DependantsformComponent},
    { path: "dependant/form/:customerid/:dependantid", component: DependantsformComponent},
    { path: "login", component: LoginComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerindexComponent,
    CustomerformComponent,
    DependantsComponent,
    DependantsformComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
