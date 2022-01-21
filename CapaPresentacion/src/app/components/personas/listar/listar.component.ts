import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from '../../../services/persona.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  constructor(public personaService:PersonaService,
    public toastr: ToastrService) { }

  ngOnInit(): void {

    this.personaService.obtenerPersonas();
  }

  eliminarPersona(id){
    if (confirm("Seguro de eliminar?")) {
      this.personaService.eliminarPersona(id).subscribe(data => {
        this.toastr.warning("El registro de la persona fue eliminado");
        this.personaService.obtenerPersonas()
      });

    }
  }

  editar(persona){
    // llamo al servicio para que emita el evento y los
    // observadores sepan que se emitió el evento
    this.personaService.actualizar(persona);
  }

}
