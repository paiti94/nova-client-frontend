import { Component, ViewChild } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { AdminServiceService } from '../../service/adminservice.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Client } from '../../model/client.model';
import { MatDialog } from '@angular/material/dialog';
import { ClientModalComponent } from '../client-modal/client-modal.component';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent {
  isAdmin: boolean = false;
  clients: any[] = [];
  displayedColumns: string[] = [
    'client_id', 'first_name', 'last_name', 'email', 'phone_number', 'address', 'city',
    'province', 'postal_code', 'country', 'date_of_birth', 'status', 'tax_id_number'
  ];
  dataSource = new MatTableDataSource<Client>();
  errorMessage: string = '';
  workspace$: any | null = null;
  selectedClient: Client | null = null;
  selectedClientKey: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selectedTabIndex: number = 0;

  constructor(private keycloakService: KeycloakService, public dialog: MatDialog, private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.isAdmin = this.keycloakService.isUserInRole('ADMIN');
    this.adminService.getClients().subscribe(
      (data: Client[]) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        if (data.length > 0) {
          this.selectItem(data[0], new Event('init'));
        }
      },
      (error) => {
        this.errorMessage = 'There was an error fetching the client list.';
        console.error('Error fetching client list:', error);
      }
    );
  }

  selectItem(client: Client, event: Event) {
    this.selectedClient = client;
    this.selectedClientKey = `${client.id}-${Date.now()}`;
    this.workspace$ = null;
    this.selectedTabIndex = 0;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onTabChange(index: number) {
    this.selectedTabIndex = index;
  }

  addClient() {
    const dialogRef = this.dialog.open(ClientModalComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.adminService.addClient(result).subscribe(
          response => {
            console.log('Client added successfully:', response);
            alert('Client added successfully');
            this.dataSource.data.push(response);
            this.dataSource._updateChangeSubscription(); // Refresh the data source
          },
          error => {
            console.error('Error adding client:', error);
            alert('Could not add client. The email is already in use. Please try again with a different email.');
          }
        );
      }
    });
  }
}
