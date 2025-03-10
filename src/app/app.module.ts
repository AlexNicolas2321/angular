import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  // Asegúrate de importar FormsModule
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule  // Asegúrate de incluir FormsModule en imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
