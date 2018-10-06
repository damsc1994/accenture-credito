import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-identificacion',
    templateUrl: './identificacion.component.html'
})
export class IdentificacionComponent implements OnInit {
    @Output() emitterIdentificacion = new EventEmitter();
    public identificacion: FormControl;

    constructor() {}

    ngOnInit(): void {
        this.identificacion = new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)]);
    }

    getIdentificacion(): void {
        this.emitterIdentificacion.emit({ identificacion: this.identificacion })
    }
}