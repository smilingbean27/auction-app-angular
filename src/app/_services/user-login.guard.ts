import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AdminDataService } from "./admin-data.service";

@Injectable()
export class UserLoginGuard implements CanActivate{

    userIsLoggedIn = false;

    constructor(private adminService: AdminDataService, private route: Router){
        
        this.adminService.userIsAuthenticated$.subscribe(
            auth2 => {this.userIsLoggedIn = auth2
            console.log('User logged in');}
        )
    }

    canActivate(): boolean {
        if (!this.userIsLoggedIn){

            this.route.navigate(['/sign-in']);         
        }

        return this.userIsLoggedIn;
    }
    
}
