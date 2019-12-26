import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {User} from '../../../models/common';
import {UserService} from '../user.service';
import {ToastService} from '../../../toast.service';

@Component({
    selector: 'user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    user: User = new User();
    userForm: FormGroup;
    constructor(
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        private toastService: ToastService
    ) {}
    ngOnInit() {
        this.loadForm();
    }
    private loadForm() {
        this.userForm = this.fb.group({
            email: new FormControl(),
            password: new FormControl(),
            firstName: new FormControl(),
            lastName: new FormControl()
        });
    }
    saveUser() {
        const tempUser = new User(this.userForm.value);
        this.userService.save(tempUser).subscribe(r => {
            this.toastService.success('User has been created successfully');
            this.router.navigate(['login']);
        });}}
