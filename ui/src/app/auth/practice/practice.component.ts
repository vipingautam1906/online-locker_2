import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { SessionService } from '../../session.service';
import { Router } from '@angular/router';
import { CardComponent } from '../../_shared/card/card.component';

@Component({
	selector: 'practice',
	templateUrl: './practice.component.html',
	styleUrls: ['./practice.component.scss']
})
export class PracticeComponent implements OnInit {

	@ViewChild(CardComponent) private card: CardComponent;

	constructor(
		private authService: AuthenticationService,
		private sessionService: SessionService,
		private router: Router
	) {
	}

	ngOnInit() {
	}

	turnCard() {
		this.card.turn();
	}

	go(url: string) {
		this.router.navigate([url]);
	}
}
