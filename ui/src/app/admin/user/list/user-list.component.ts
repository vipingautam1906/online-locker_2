import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../../models/org/user';

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: User[] = [];

	constructor(
		private userService: UserService,
		private router: Router) {
	}

	ngOnInit() {
		this.userService.getAll().subscribe((r) => {
			this.users = r.map(e => new User(e));
		});
	}

	openUser(user: User) {
		this.router.navigate([`users/edit/${user.id}`]);
	}

	navigateToCreate() {
		this.router.navigate([`users/add`]);
	}
}
