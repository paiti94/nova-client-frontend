import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClientModalComponent>
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      postal_code: ['', Validators.required],
      country: ['', Validators.required],
      tax_id_number: [''],
      date_of_birth: [null, Validators.required],
      notes: [''],
      status: ['Open']
    });
  }

  onSubmit() {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
