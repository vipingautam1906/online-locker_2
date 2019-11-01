import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../models/org/user';
import { UserService } from '../user.service';
import { ToastService } from '../../../toast.service';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {


	get user(): User { return this.actualUser; }
	private actualUser: User = new User();

	// template related fields here
	userForm: FormGroup;

	// then computational related or private fields will come.

	constructor(
		private router: Router,
		private userService: UserService,
		private fb: FormBuilder,
		private toastService: ToastService
	) {
	}

	ngOnInit() {
		this.loadForm();
  	}


	private loadForm() {
		this.userForm = this.fb.group({
			email: new FormControl(),
			firstName: new FormControl(),
			lastName: new FormControl()
		});
	}

	saveUser() {
		const tempUser = new User(this.userForm.value);
    this.userService.save(tempUser).subscribe(r => {
      this.toastService.success('User has been created successfully');
      this.router.navigate(['login']);
    });
	}
}
