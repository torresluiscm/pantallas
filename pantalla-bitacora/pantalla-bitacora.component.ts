import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: number;
  name: string;
  role: string;
  registrationDate: Date;
  lastChange: Date;
  lastChangeBy: string;
}

@Component({
  selector: 'app-pantalla-bitacora',
  templateUrl: './pantalla-bitacora.component.html',
  styleUrls: ['./pantalla-bitacora.component.css']
})
export class PantallaBitacoraComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'role', 'registrationDate', 'lastChange', 'lastChangeBy'];
  dataSource = new MatTableDataSource<UserData>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtrosVisibles = false;
  filtroRol: string = '';
  filtroFechaRegistroMin: Date | null = null;
  filtroFechaRegistroMax: Date | null = null;
  rolesDisponibles: string[] = [];

  constructor() { }

  private createFakeUser(id: number): UserData {
    const roles = ['Administrador', 'Operador'];
    const names = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Lee', 'Ethan Davis', 'Fiona Green', 'George White', 'Hannah Clark', 'Ivan Rodriguez', 'Julia Kim'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomRole = roles[Math.floor(Math.random() * roles.length)];

    const registrationDate = new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000);
    const lastChange = new Date(registrationDate.getTime() + Math.random() * (Date.now() - registrationDate.getTime()));
    const changers = ['Sistema'];
    const lastChangeBy = changers[Math.floor(Math.random() * changers.length)]


    return {
      id: id,
      name: randomName,
      role: randomRole,
      registrationDate: registrationDate,
      lastChange: lastChange,
      lastChangeBy: lastChangeBy,
    };
  }


  ngOnInit() {
    const users: UserData[] = Array.from({ length: 100 }, (_, k) => this.createFakeUser(k + 1));
    this.dataSource = new MatTableDataSource(users);
    this.rolesDisponibles = [...new Set(this.dataSource.data.map(item => item.role))];  // Correctly extract unique roles
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  toggleFiltros() {
    this.filtrosVisibles = !this.filtrosVisibles;
  }

  aplicarFiltros() {
      this.dataSource.filter = 'customFilter';
  }

  createFilter(): (data: UserData, filter: string) => boolean {
    return (data: UserData, filter: string): boolean => {

      if (this.filtroRol && data.role !== this.filtroRol) {
        return false;
      }

      if (this.filtroFechaRegistroMin) {
        const minDate = new Date(this.filtroFechaRegistroMin);
        minDate.setHours(0, 0, 0, 0);
        if (data.registrationDate < minDate) {
          return false;
        }
      }

      if (this.filtroFechaRegistroMax) {
        const maxDate = new Date(this.filtroFechaRegistroMax);
        maxDate.setHours(23, 59, 59, 999);
        if (data.registrationDate > maxDate) {
          return false;
        }
      }

      return true;
    };
  }

  limpiarFiltros() {
    this.filtroRol = '';
    this.filtroFechaRegistroMin = null;
    this.filtroFechaRegistroMax = null;
    this.aplicarFiltros();
  }
}
