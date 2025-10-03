import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import { Navbar } from "./Shared/navbar/navbar";
import {BrowserModule} from '@angular/platform-browser';
import {routes} from './app.routes';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: []
})
export class AppComponent {
  title = 'SF';
}
