import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioResponse } from '../../services/usuario.service';
import { formatLanguage } from '../../shared/formatters';

@Component({
  selector: 'app-usuarios-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './usuarios-list.component.html',
  styles: []
})
export class UsuariosListComponent {
  @Input() usuarios: UsuarioResponse[] = [];
  @Output() refresh = new EventEmitter<void>();

  formatLanguageId = formatLanguage;

  trackById(_: number, usuario: UsuarioResponse) {
    return usuario.id;
  }
}
