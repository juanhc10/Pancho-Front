import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CuidadorDto } from '../../services/cuidador.service';
import { formatLanguage } from '../../shared/formatters';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './cuidadores.component.html',
  styles: []
})
export class CuidadoresComponent {
  @Input() cuidadores: CuidadorDto[] = [];
  @Output() refresh = new EventEmitter<void>();

  formatLanguageId = formatLanguage;

  trackByNombre(_: number, cuidador: CuidadorDto) {
    return cuidador.nombre;
  }
}
