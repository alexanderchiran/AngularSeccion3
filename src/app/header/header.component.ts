import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
    isAuthenticated = false;
    private userSubscription : Subscription;
    fechaExpiracion = new Date();

    constructor(private dataStorageService: DataStorageService,
                private authService: AuthService) { }


    ngOnInit(){
     this.userSubscription=  this.authService.user.subscribe(user =>{
       // this.isAuthenticated = !user ? true : false;
       this.isAuthenticated = !!user;
       console.log("Validacion user1: ")
       console.log((user !=null && user.fechaExpiracion));
       if(user !=null && user.fechaExpiracion){
            this.fechaExpiracion= user.fechaExpiracion;
        }
       console.log("Validacion user2: ")
       console.log(user);
       console.log(!user);
       console.log(!!user);
     }
     );

     
    }

    ngOnDestroy(){
        this.userSubscription.unsubscribe();
    }

    /**
     * Guarda en firebase
     */
    onSaveData() {
        console.log("entra a onSaveData")
        this.dataStorageService.storeRecipes();
    }

    /**
     * consulta en firebase
     */
    onFetchData(){
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }
}