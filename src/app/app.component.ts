import {Component, OnInit, signal} from '@angular/core'; // Importamos signal
import {FormsModule} from '@angular/forms';
import {CuidadorDto, CuidadorService} from './services/cuidador.service';
import {UsuarioRegistro, UsuarioResponse, UsuarioService} from './services/usuario.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: '../styles.css'
})
export class AppComponent implements OnInit {
  cuidadores = signal<CuidadorDto[]>([]);
  usuarios = signal<UsuarioResponse[]>([]);

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

  cargarCuidadores() {
    this.cuidadorService.getCuidadores().subscribe({
      next: (data) => this.cuidadores.set(data),
      error: (e) => console.error('Error cargando cuidadores', e)
    });
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios.set(data),
      error: (e) => console.error('Error cargando usuarios', e)
    });
  }

  registrarUsuario() {
    this.usuarioService.registrarUsuario(this.nuevoUsuario).subscribe({
      next: (data) => {
        this.usuarioCreado.set(data);
        this.cargarUsuarios();
        this.nuevoUsuario = {nombre: '', contrasenia: '', idioma: '', tipoUsuario: ''};
      },
      error: (e) => console.error('Error registrando usuario', e)
    });
  }
}
