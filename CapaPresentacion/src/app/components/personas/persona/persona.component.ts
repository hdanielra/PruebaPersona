import { Component, OnDestroy, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit, OnDestroy {

  form: FormGroup;

  // se usa para al final dessubscribir al suscriptor
  subscription: Subscription;


  persona: Persona;
  idPersona = 0;

  // ..................................................................................................
  constructor(private formBuilder: FormBuilder,
    private personaService:PersonaService,
    private toastr:ToastrService
    ) {
      this.form = this.formBuilder.group({
        id:0,
        nombre: ['',[Validators.required, Validators.maxLength(100)]],
        apellido: ['',[Validators.required, Validators.maxLength(100)]]
      });
    }
    // ..................................................................................................




   // ---------------------------------------------------------------
   guardarPersona(){

    if (this.idPersona ===undefined || this.idPersona === 0) {
      this.agregar();
    } else{
      this.editar();
    }
 }
 // ---------------------------------------------------------------



   // ---------------------------------------------------------------
   agregar(){

    console.log(this.form);

    const persona:Persona={
      nombre:this.form.get('nombre').value,
      apellido:this.form.get('apellido').value
    };


    this.personaService.guardarPersona(persona).subscribe(
      data => {
      console.log('Guardado exitosamente');
      // console.log(data);
        this.toastr.success("Registro agregado",
                            "La persona fue creada");
        this.personaService.obtenerPersonas();
        this.form.reset();
      });
 }
 // ---------------------------------------------------------------

 // ---------------------------------------------------------------
 editar(){
    const persona:Persona={
        id: this.persona.id,
        nombre: this.form.get('nombre').value,
        apellido: this.form.get('apellido').value
      };

      this.personaService.actualizarPersona(this.idPersona, persona).subscribe(
        data => {
        console.log('Actualizado exitosamente');
        // console.log(data);
          this.toastr.success("Registro actualizado",
                              "Los datos de la persona fueron actualizados");
          this.personaService.obtenerPersonas();
          this.form.reset();
          this.idPersona = 0;
        });
 }
 // ---------------------------------------------------------------






  // ---------------------------------------------------------------
  ngOnInit(): void {

     // el observador verifica si se emitió el evento
    // para llenar los datos de la tarjeta en el formulario
    this.subscription = this.personaService.obtenerPersona$()
                          .subscribe(data => {
                            console.log(data);
                            // llenamos los datos de la persona
                            this.persona = data;
                            // llenamos  el formulario
                            this.form.patchValue({
                              id: this.persona.id,
                              nombre: this.persona.nombre,
                              apellido: this.persona.apellido
                            });

                            // acá actualizamos el id para posteriormente
                            // saber si es una actualización
                            this.idPersona = this.persona.id;
                          });

  }
  // ---------------------------------------------------------------


  // ---------------------------------------------------------------
  ngOnDestroy(): void {
    this.subscription.unsubscribe();

  }
  // ---------------------------------------------------------------

}
