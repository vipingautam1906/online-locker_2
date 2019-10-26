import { Component } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

/*Card summary component related*/
@Component({
	selector: 'card-summary',
	template: `
		<div class="card-summary-header">
        	<ng-content select="card-summary-header"></ng-content>
        </div>
        <ng-content select="card-summary-body"></ng-content>
        <ng-content select="card-summary-footer"></ng-content>
	`,
	styleUrls: ['./card.component.scss'],
})
export class CardSummaryComponent {
}

@Component({
	selector: 'card-summary-header',
	template: `<ng-content></ng-content>`
})
export class CardSummaryHeaderComponent {
}
@Component({
	selector: 'card-summary-body',
	template: `<ng-content></ng-content>`
})
export class CardSummaryBodyComponent {
}
@Component({
	selector: 'card-summary-footer',
	template: `<ng-content></ng-content>`
})
export class CardSummaryFooterComponent {
}


/*Card description component related*/
@Component({
	selector: 'card-description',
	template: `
        <ng-content select="card-description-header"></ng-content>
        <ng-content select="card-description-body"></ng-content>
        <ng-content select="card-description-footer"></ng-content>
	`,
	styleUrls: ['./card.component.scss'],
})
export class CardDescriptionComponent {
}

@Component({
	selector: 'card-description-header',
	template: `<ng-content></ng-content>`
})
export class CardDescriptionHeaderComponent {
}
@Component({
	selector: 'card-description-body',
	template: `<ng-content></ng-content>`
})
export class CardDescriptionBodyComponent {
}
@Component({
	selector: 'card-description-footer',
	template: `<ng-content></ng-content>`
})
export class CardDescriptionFooterComponent {
}

/**
 * Time to create Actual Card component.
 * this card uses several placeholders to show hide summary/description views
 */
@Component({
	selector: 'card, .card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
	animations: [
		trigger('slideInOut', [
			transition(':enter', [
				style({transform: 'translateX(-100%)'}),
				animate('200ms ease-in', style({transform: 'translateX(0%)'}))
			]),
			transition(':leave', [
				animate('100ms ease-in', style({transform: 'translateX(100%)'}))
			])
		])
	]
})
export class CardComponent {

	turnedState: boolean;

	turn() {
		this.turnedState = !this.turnedState;
	}

	isTurned() {
		return this.turnedState;
	}
}

