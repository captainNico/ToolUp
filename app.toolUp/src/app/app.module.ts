import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';

// Services
import { AuthService } from './auth/auth.service';
import { AccountService } from './services/account.service';
import { ApiService } from './services/api.service';

// Pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { MenuBoardComponent } from './layout/menu-board/menu-board.component';
import { BoardComponent } from './pages/board/board.component';

// Componenent
import { PopupNewColumnComponent } from './pages/board/popup-new-column/popup-new-column.component';
import { PopupNewTaskComponent } from './pages/board/popup-new-task/popup-new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    HeaderComponent,
    MenuBoardComponent,
    BoardComponent,
    PopupNewColumnComponent,
    PopupNewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, AccountService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
