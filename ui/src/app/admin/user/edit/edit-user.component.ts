import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/org/user';
import { UserService } from '../user.service';

@Component({
	selector: 'edit-user',
	templateUrl: './edit-user.component.html',
	styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

	userId: string;
	user: User;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private userService: UserService,
	) {
	}

	ngOnInit() {
		this.route.params.subscribe(r => {
			this.userId = r.userId;
			this.loadUser();
		});
	}

	private loadUser() {
		this.userService.get(this.userId).subscribe((r) => {
			this.user = r;
		});
	}
}
