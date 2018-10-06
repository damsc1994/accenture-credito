import { Component, OnInit } from '@angular/core'

@Component({
    selector: 'app-home',
    templateUrl: './inicio.component.html'
})
export class HomeComponent implements OnInit {
    public titulo: String

    constructor(){
        this.titulo = 'Home'
    }

    ngOnInit(): void {
        
    }

}