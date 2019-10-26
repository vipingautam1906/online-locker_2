import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from '../../../models/org/user';
import { UserService } from '../user.service';
import { CacheService } from '../../../cache.service';
import { ToastService } from '../../../toast.service';

@Component({
	selector: 'user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

	// first of all.. Input() fields will come
	@Input()
	set user(val: User) {
		if (!val) { return; }
		this.actualUser = val;
		this.patchForm();
	}
	get user(): User { return this.actualUser; }
	private actualUser: User = new User();

	// template related fields here
	userForm: FormGroup;

	// then computational related or private fields will come.

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
		private fb: FormBuilder,
		private cacheService: CacheService,
		private toastService: ToastService
	) {
	}

	ngOnInit() {
		this.loadForm();
	}

	private loadForm() {
		this.userForm = this.fb.group({
			id: new FormControl(),
			email: new FormControl(),
			firstName: new FormControl(),
			lastName: new FormControl()
		});
	}
	private patchForm() {
		this.userForm.patchValue({
			id: this.user.id,
			email: this.user.email,
      password: this.user.password,
      firstName: this.user.firstName,
			lastName: this.user.lastName
		});
	}

	saveUser() {
		const tempUser = new User(this.userForm.value);
		if (!tempUser.id) {
			this.userService.save(tempUser).subscribe(r => {
				this.toastService.success('User has been created successfully');
				this.router.navigate(['users']);
			});
		} else {
			this.userForm.disable();
			this.userService.update(tempUser).subscribe(r => {
				this.userForm.enable();
				this.toastService.success('User has been updated successfully');
			});
		}
	}
}
