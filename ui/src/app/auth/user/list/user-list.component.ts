import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from "../../../models/common";

@Component({
	selector: 'user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

	users: User[] = [];

	constructor(private userService: UserService) { }

	ngOnInit() {
		this.userService.getAll().subscribe((r) => {
			this.users = r.map(e => new User(e));
		});
	}
}
