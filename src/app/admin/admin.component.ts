import { Component, OnInit } from '@angular/core';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-admin',
  standalone: false,
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private base:BaseService) {}

  ngOnInit(): void {
    this.getAllPlaces();
    this.getAllUsers();
    this.getAllRents();
  }

  getAllUsers() {
    console.log(this.base.getAllUsers());
    return this.base.getAllUsers();
  }

  getAllRents() {
    console.log(this.base.getAllRents());
    return this.base.getAllRents();
  }

  getAllPlaces() {
    console.log(this.base.getAllPlaces());
    return this.base.getAllPlaces();
  }
}
