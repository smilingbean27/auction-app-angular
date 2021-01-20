import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminDataService } from "./admin-data.service";

@Injectable()
export class LoginGuard implements CanActivate{

    adminIsLoggedIn = false;

    constructor(private adminService: AdminDataService, private route: Router){
        this.adminService.adminIsAuthenticated$.subscribe(
            auth1 => this.adminIsLoggedIn = auth1)
    }

    canActivate(): boolean {
        if (!this.adminIsLoggedIn){

            this.route.navigate(['/admin/sign-in']);         
        }

        return this.adminIsLoggedIn;
    }
    
}
