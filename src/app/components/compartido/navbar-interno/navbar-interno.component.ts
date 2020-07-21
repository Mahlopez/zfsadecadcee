import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../../services/navBarService/navbar.service';
import { AuthService } from '../../../services/autenticacion/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-interno',
  templateUrl: './navbar-interno.component.html',
  styles: [
  ]
})
export class NavbarInternoComponent implements OnInit {

  ruta: string;
  constructor(public navbarService: NavbarService, public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
    this.ruta = this.router.url;
    this.navbarService.hide();
  }

}
