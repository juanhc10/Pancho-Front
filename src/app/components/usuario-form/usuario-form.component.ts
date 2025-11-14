import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioRegistro } from '../../services/usuario.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: "./usuario-form.component.html",
  styles: []
})
export class UsuarioFormComponent {
  @Output() create = new EventEmitter<UsuarioRegistro>();

  idiomasDisponibles = ['Español', 'Inglés', 'Francés', 'Alemán'];
  tiposUsuario = ['Dueño', 'Cuidador'];

  model: UsuarioRegistro = { nombre: '', contrasenia: '', idioma: '', tipoUsuario: '' };

  onSubmit() {
    if (!this.model.nombre || !this.model.contrasenia) return;
    this.create.emit({ ...this.model });
    this.model = { nombre: '', contrasenia: '', idioma: '', tipoUsuario: '' };
  }
}
