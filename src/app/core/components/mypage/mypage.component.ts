import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// CORRECCIÓN DE RUTA: Subimos 3 niveles para llegar a layout/service
import { BugService } from '../../../core/components/mypage/service/bug.service'; 
import { MessageService } from 'primeng/api';

// PrimeNG
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';

@Component({
    selector: 'app-mypage',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, ButtonModule, InputTextModule, CardModule, DropdownModule, ToastModule],
    templateUrl: './mypage.component.html',
    providers: [MessageService]
})
export class MypageComponent implements OnInit {
    bugs: any[] = [];
    nuevoBug: any = { titulo: '', estado: 'Sin comenzar' };
    estados = [
        { label: 'Sin comenzar', value: 'Sin comenzar' },
        { label: 'En proceso', value: 'En proceso' },
        { label: 'Terminado', value: 'Terminado' }
    ];

    constructor(private bugService: BugService, private messageService: MessageService) {}

    ngOnInit() { this.cargarBugs(); }

    cargarBugs() {
        this.bugService.getBugs().subscribe({
            next: (data: any) => this.bugs = data,
            error: (err: any) => console.error('Error al cargar', err)
        });
    }

    agregarBug() {
        if (this.nuevoBug.titulo.trim()) {
            this.bugService.createBug(this.nuevoBug).subscribe({
                next: (res: any) => {
                    this.messageService.add({ severity: 'success', summary: 'Bugs', detail: 'Sincronizado con Atlas' });
                    this.nuevoBug = { titulo: '', estado: 'Sin comenzar' };
                    this.cargarBugs();
                }
            });
        }
    }

    eliminarBug(id: string) {
        this.bugService.deleteBug(id).subscribe({
            next: () => {
                this.messageService.add({ severity: 'warn', summary: 'Bugs', detail: 'Eliminado de la nube' });
                this.cargarBugs();
            }
        });
    }
}