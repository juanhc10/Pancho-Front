import { Component, OnInit } from '@angular/core';
import { CuidadorService, CuidadorDto } from './services/cuidador.service';
import { UsuarioService, UsuarioResponse, UsuarioRegistro } from './services/usuario.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.html',
    imports: [CommonModule, FormsModule]
})
export class AppComponent implements OnInit {
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
