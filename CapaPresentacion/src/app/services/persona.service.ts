import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  myAppUrl: string = 'https://localhost:44384/';
  myApiUrl: string = 'api/Persona/';


  list: Persona[];


  private actualizarFormulario =  new BehaviorSubject<Persona>({} as any);

  constructor(private http:HttpClient) { }


  guardarPersona(persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(this.myAppUrl + this.myApiUrl, persona );
  }

  obtenerPersonas(){
    this.http.get(this.myAppUrl + this.myApiUrl).toPromise().then(data => {
                    this.list = data as Persona[];
                  });
  }

  eliminarPersona(id: number):Observable<Persona>{
    return this.http.delete<Persona>(this.myAppUrl + this.myApiUrl + id)
  }

  actualizar(persona: Persona){
    // le avisamos que hay un nuevo valor... emitimos el evento
    // este método lo llamo desde el listado al momento de dar clic
    this.actualizarFormulario.next(persona);
  }
  obtenerPersona$():Observable<Persona>{
    return this.actualizarFormulario.asObservable();
  }

  // ya cuando tenemos la información cargada en el formulario,
  // ahora sí se puede actualizar... desde el componente agregar
  // usando id>0, puedo saber si es agregar o actualizar
  actualizarPersona(id: number, persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(this.myAppUrl + this.myApiUrl + id, persona);
  }


}
