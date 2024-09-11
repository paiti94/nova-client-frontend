import { APP_INITIALIZER,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ProfileComponent } from './component/profile/profile.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FooterComponent } from './component/footer/footer.component';
import { ClientsComponent } from './component/clients/clients.component';
import { MessageComponent } from './component/message/message.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HeaderComponent } from './component/header/header.component';
import { UsersComponent } from './component/users/users.component';
import { ClientModalComponent } from './component/client-modal/client-modal.component';
import { AdminServiceService } from './service/adminservice.service';
import { CsrfInterceptor } from './service/csrf.interceptor';
import { WorkspaceComponent } from './component/workspace/workspace.component';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddJobModalComponent } from './component/add-job-modal/add-job-modal.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxFileDropModule } from 'ngx-file-drop';

import { DatePipe } from '@angular/common';
import { JobDetailModalComponent } from './component/job-detail-modal/job-detail-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TaskModalComponent } from './component/task-modal/task-modal.component';
import { ClientWorkspaceComponent } from './component/client-workspace/client-workspace.component';
import { TaskDetailModalComponent } from './component/task-detail-modal/task-detail-modal.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { AddTaskModalComponent } from './component/add-task-modal/add-task-modal.component';
function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8180/',
        realm: 'novaclientportal',
        clientId: 'novaclientportalpublicclient',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://localhost:4200/home',
        // checkLoginIframe: false,
        // onLoad: 'check-sso',
      },
      loadUserProfileAtStartUp: false,
      // bearerExcludedUrls: ['/assets'],
    });
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent,
    FooterComponent,
    ClientsComponent,
    MessageComponent,
    HeaderComponent,
    UsersComponent,
    ClientModalComponent,
    WorkspaceComponent,
    AddJobModalComponent,
    JobDetailModalComponent,
    TaskModalComponent,
    ClientWorkspaceComponent,
    TaskDetailModalComponent,
    FileUploadComponent,
    AddTaskModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatListModule,
    MatTabsModule,
    MatToolbarModule,
    MatGridListModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    DatePipe,
    NgxFileDropModule,
    MatSlideToggleModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    KeycloakAngularModule,

  ],
  providers: [
    DatePipe,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
    provideAnimationsAsync(),
    AdminServiceService,
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
