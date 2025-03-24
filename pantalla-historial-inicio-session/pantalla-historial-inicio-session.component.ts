import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


export interface SessionLog {
  id: number;
  username: string;
  loginTime: Date;
  logoutTime: Date | null;
  status: 'Success' | 'Failed';
}

@Component({
  selector: 'app-pantalla-historial-inicio-session',
  templateUrl: './pantalla-historial-inicio-session.component.html',
  styleUrl: './pantalla-historial-inicio-session.component.css'
})
export class PantallaHistorialInicioSessionComponent implements OnInit, AfterViewInit { // Implement interfaces
  displayedColumns: string[] = ['id', 'username', 'loginTime', 'logoutTime', 'status'];
  dataSource = new MatTableDataSource<SessionLog>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filtrosVisibles = false;
  filtroUsuario: string = '';
  filtroFechaInicioMin: Date | null = null;
  filtroFechaInicioMax: Date | null = null;
  filtroEstado: 'Success' | 'Failed' | '' = '';

  constructor() { }

  private createFakeSessionLog(id: number): SessionLog {
    const usernames = ['user1', 'admin', 'testuser', 'guest', 'poweruser', 'editor', 'viewer'];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];

    const loginTime = new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000);


    let logoutTime: Date | null = null;
    if (Math.random() > 0.2) {
      logoutTime = new Date(loginTime.getTime() + Math.random() * 4 * 60 * 60 * 1000);
    }

    const status: 'Success' | 'Failed' = Math.random() > 0.1 ? 'Success' : 'Failed';

    return {
      id: id,
      username: randomUsername,
      loginTime,
      logoutTime,
      status,
    };
  }

  ngOnInit() {
    const logs: SessionLog[] = Array.from({ length: 100 }, (_, k) => this.createFakeSessionLog(k + 1));
    this.dataSource = new MatTableDataSource(logs);
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

  createFilter(): (data: SessionLog, filter: string) => boolean {
    return (data: SessionLog, filter: string): boolean => {
      if (this.filtroUsuario && data.username.toLowerCase().indexOf(this.filtroUsuario.toLowerCase()) === -1) {
        return false;
      }

      if (this.filtroFechaInicioMin) {
        const minDate = new Date(this.filtroFechaInicioMin);
        minDate.setHours(0, 0, 0, 0);
        if (data.loginTime < minDate) {
          return false;
        }
      }

      if (this.filtroFechaInicioMax) {
        const maxDate = new Date(this.filtroFechaInicioMax);
        maxDate.setHours(23, 59, 59, 999);
        if (data.loginTime > maxDate) {
          return false;
        }
      }

      if (this.filtroEstado && data.status !== this.filtroEstado) {
        return false;
      }

      return true;
    };
  }

  limpiarFiltros() {
    this.filtroUsuario = '';
    this.filtroFechaInicioMin = null;
    this.filtroFechaInicioMax = null;
    this.filtroEstado = '';
    this.aplicarFiltros();
  }
}
