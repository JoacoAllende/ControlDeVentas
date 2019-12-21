import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(form: NgForm){
    this.authService.loginUser(form.value).subscribe(res => {
      this.router.navigateByUrl('inicio');
    })
    this.resetForm(form);
  }

  resetForm(form?: NgForm){
    if(form){
      form.reset();
    }
  }

}
