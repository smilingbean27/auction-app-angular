import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminDataService } from "./admin-data.service";

@Injectable()
export class LoginGuard implements CanActivate{
    loggedIn: boolean = false;
    constructor(private adminService: AdminDataService, private route: Router){
        this.adminService.authenticated$.subscribe(
            authStatus => this.loggedIn = authStatus)
    }

    canActivate(): boolean {
        if (!this.loggedIn){
            this.route.navigate(['/admin/sign-in']);
        }

        return this.loggedIn;
    }
    
}
