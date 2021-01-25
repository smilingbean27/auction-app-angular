import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminDataService } from "./admin-data.service";

@Injectable()
export class LoginGuard implements CanActivate{

    isLoggedIn = false;

    constructor(private adminService: AdminDataService, private route: Router){
    }

    canActivate(): boolean {
        this.isLoggedIn = this.adminService.checkAuthentication();
        const user = this.adminService.getUserFromStorage();

        console.log('Something')
        if (!this.isLoggedIn){
            this.route.navigate(['admin/sign-in']);         
        } 

        return this.isLoggedIn;
    }
    
}
