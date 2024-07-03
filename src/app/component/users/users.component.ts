import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakadminService } from '../../service/keycloakadmin.service';
import { MatDialog } from '@angular/material/dialog';
import { AdminServiceService } from '../../service/adminservice.service';
import { Tag } from '../../model/tag.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  isAdmin: boolean = false;
  users: any[] = [];
  roles: any[] = [];
  tags: Tag[] = [];
  selectedUserId: string = '';
  selectedRoleId: string = '';
  selectedRoleName: string = '';
  newTagName: string = '';
  constructor(private keycloakService: KeycloakService, private keycloakadminService: KeycloakadminService,   public dialog: MatDialog,  private adminService: AdminServiceService,) { }

  ngOnInit(): void {
    this.isAdmin = this.keycloakService.isUserInRole('ADMIN');
    this.keycloakadminService.getUsers().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
    this.keycloakadminService.getRoles().subscribe(
      roles => {
        this.roles = roles;
      },
      error => {
        console.error('Error fetching roles:', error);
      }
    )
    this.getTags();
  }
  onRoleChange(event: Event) {
    const selectedRoleId = (event.target as HTMLSelectElement).value;
    const selectedRole = this.roles.find(role => role.id === selectedRoleId);
    this.selectedRoleId = selectedRoleId;
    this.selectedRoleName = selectedRole ? selectedRole.name : '';
  }

  addRole() {
    if (this.selectedUserId && this.selectedRoleId && this.selectedRoleName) {
      this.keycloakadminService.addRoleToUser(this.selectedUserId, this.selectedRoleId, this.selectedRoleName).subscribe(
        response => {
          console.log('Role added successfully:', response);
          alert('Role added successfully');
        },
        error => {
          console.error('Error adding role:', error);
        }
      );
    } else {
      alert('User or role not selected');
      console.error('User or role not selected');
    }
  }

  getTags(){
    this.adminService.getTags().subscribe(
      tags => {
        this.tags = tags;
      }
    )
  }
  createTag(){
    if (this.newTagName.trim()) {
      const existingTag = this.tags.find(tag => tag.name.toLowerCase() === this.newTagName.trim().toLowerCase());
      if (existingTag) {
        alert('Tag name already exists. Please choose a different name.');
      } else {
        const newTag: Tag = new Tag(0, this.newTagName.trim()); // id is set to 0, it will be set by the server
        this.adminService.addTag(newTag).subscribe(tag => {
          this.tags.push(tag);
          this.newTagName = '';
        });
      }
    }
  }

  getTagClass(tag: Tag): string {
    const tagIndex = this.tags.indexOf(tag) + 1;
    const colorClassIndex = tagIndex % 5 === 0 ? 5 : tagIndex % 5;
    return `tag-color-${colorClassIndex}`;
  }
}
