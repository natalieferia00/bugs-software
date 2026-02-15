import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG y Componentes de Sakai
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-mypage',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule, 
        TableModule, 
        ButtonModule, 
        InputTextModule, 
        CardModule, 
        DropdownModule, 
        ToastModule
    ],
    templateUrl: './mypage.component.html',
    providers: [MessageService]
})
export class MypageComponent implements OnInit {
    bugs: any[] = [];
    nuevoBug: any = { titulo: '', estado: 'Sin comenzar' };
    readonly CLAVE_LOCAL = 'sakai_bugs_storage_v1';

    // Opciones para las etiquetas de estado
    estados = [
        { label: 'Sin comenzar', value: 'Sin comenzar' },
        { label: 'En proceso', value: 'En proceso' },
        { label: 'Terminado', value: 'Terminado' }
    ];

    constructor(private messageService: MessageService) {}

    ngOnInit() {
        this.cargarDatos();
    }

    cargarDatos() {
        const data = localStorage.getItem(this.CLAVE_LOCAL);
        if (data) {
            const parsed = JSON.parse(data);
            // Rehidratar las fechas (convertir string a Date)
            this.bugs = parsed.map((b: any) => ({ ...b, fecha: new Date(b.fecha) }));
        } else {
            this.bugs = [{ titulo: 'Sistema de bugs listo', estado: 'Sin comenzar', fecha: new Date() }];
            this.guardar();
        }
    }

    agregarBug() {
        if (this.nuevoBug.titulo.trim()) {
            const bug = { 
                titulo: this.nuevoBug.titulo,
                estado: this.nuevoBug.estado,
                fecha: new Date() 
            };

            this.bugs = [...this.bugs, bug]; // Inmutabilidad para refrescar widgets
            this.guardar();
            this.messageService.add({ severity: 'success', summary: 'Sincronizado', detail: 'Bug guardado en LocalStorage' });
            this.nuevoBug = { titulo: '', estado: 'Sin comenzar' };
        }
    }

    cambiarEstado(index: number, nuevoEstado: string) {
        this.bugs[index].estado = nuevoEstado;
        this.bugs = [...this.bugs]; 
        this.guardar();
        this.messageService.add({ severity: 'info', summary: 'Estado Actualizado', detail: nuevoEstado });
    }

    eliminarBug(index: number) {
        this.bugs = this.bugs.filter((_, i) => i !== index);
        this.guardar();
        this.messageService.add({ severity: 'warn', summary: 'Eliminado', detail: 'Registro borrado de memoria' });
    }

    private guardar() {
        localStorage.setItem(this.CLAVE_LOCAL, JSON.stringify(this.bugs));
    }
}