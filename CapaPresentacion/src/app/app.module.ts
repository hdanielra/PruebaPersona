import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { PersonaComponent } from './components/personas/persona/persona.component';
import { ListarComponent } from './components/personas/listar/listar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PersonasComponent } from './components/personas/personas.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonasComponent,
    PersonaComponent,
    ListarComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
