import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CuidadorService, CuidadorDto } from './services/cuidador.service';
import { UsuarioService, UsuarioResponse, UsuarioRegistro } from './services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('pancho-front');
  cuidadores: CuidadorDto[] = [];
  usuarios: UsuarioResponse[] = [];
  nuevoUsuario: UsuarioRegistro = { nombre: '', contrasenia: '', idioma: '', tipoUsuario: '' };
  usuarioCreado?: UsuarioResponse;

  constructor(
    private cuidadorService: CuidadorService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit() { }

  cargarCuidadores() {
    this.cuidadorService.getCuidadores().subscribe(data => this.cuidadores = data);
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => this.usuarios = data);
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe(data => {
      this.usuarioCreado = data;
      this.cargarUsuarios();
    });
  }
}
