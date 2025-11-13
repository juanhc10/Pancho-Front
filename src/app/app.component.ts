import {Component, inject, OnInit, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CuidadorDto, CuidadorService} from './services/cuidador.service';
import {UsuarioRegistro, UsuarioResponse, UsuarioService} from './services/usuario.service';
import {CommonModule} from '@angular/common';

// --- MATERIAL IMPORTS ---
// (Mantener los imports de Material)
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDividerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: '../styles.css'
})
export class AppComponent implements OnInit {
  private snackBar = inject(MatSnackBar);

  cuidadores = signal<CuidadorDto[]>([]);
  usuarios = signal<UsuarioResponse[]>([]);

  idiomasDisponibles = ['Español', 'Inglés', 'Francés', 'Alemán'];
  tiposUsuario = ['Dueño', 'Cuidador'];

  nuevoUsuario: UsuarioRegistro = {
    nombre: '', contrasenia: '', idioma: '', tipoUsuario: ''
  };

  usuarioCreado = signal<UsuarioResponse | undefined>(undefined);

  constructor(
    private cuidadorService: CuidadorService,
    private usuarioService: UsuarioService
  ) {
  }

  ngOnInit() {
  }

  formatLanguage(idioma: string): string {
    if (!idioma) return '';
    let corrected = idioma.toUpperCase();
    if (corrected === 'ESPANIOL') {
      corrected = 'ESPAÑOL';
    }
    const lower = corrected.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  cargarCuidadores() {
    this.cuidadorService.getCuidadores().subscribe({
      next: (data) => this.cuidadores.set(data),
      error: (e) => this.mostrarError('Error cargando cuidadores')
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (e) => this.mostrarError('Error cargando usuarios')
    });
  }

  registrarUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.contrasenia) return;

    this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: (data) => {
        this.snackBar.open(`¡Usuario ${data.nombre} creado!`, 'Cerrar', {duration: 3000});

        this.cargarUsuarios();
        this.nuevoUsuario = {nombre: '', contrasenia: '', idioma: '', tipoUsuario: ''};
      },
      error: (e) => this.mostrarError('Error al registrar usuario')
    });
  }

  private mostrarError(mensaje: string) {
    this.snackBar.open(mensaje, 'Ok', {duration: 5000, panelClass: ['error-snackbar']});
    console.error(mensaje);
  }
}
