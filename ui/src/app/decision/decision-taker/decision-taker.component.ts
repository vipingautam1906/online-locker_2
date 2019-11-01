import {Component} from '@angular/core';
import {SessionService} from '../../session.service';
import {ActivatedRoute, Event, NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'decision-taker',
  templateUrl: './decision-taker.component.html',
  styleUrls: ['./decision-taker.component.scss']
})
export class DecisionTakerComponent {

  shouldBehaveAsAuthenticated: boolean;

  private noAuthNeededRoutes: string[] = [
    '/login',
    '/error',
    '/unauthorized',
    '/practice',
  ];

  constructor(
    private sessionService: SessionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.shouldBehaveAsAuthenticated = false;

    this.router.events.subscribe((ev: Event) => {
      if (ev instanceof NavigationStart) {
        this.takeDecision(ev);
      }
    });
  }

  private noAuthUrlExists(currUrl: string): boolean {
    return (this.noAuthNeededRoutes
      .filter(r => currUrl.startsWith(r)).length) > 0;
  }

  private takeDecision(routeEv: NavigationStart) {
    const currentUrl = routeEv.url;

    if (!this.sessionService.isAuthenticated()) {
      if (!this.noAuthUrlExists(currentUrl)) {
        this.router.navigate(['login']);
      }
      this.shouldBehaveAsAuthenticated = false;
    } else {
      if (this.noAuthUrlExists(currentUrl)) {
        this.shouldBehaveAsAuthenticated = false;
      } else {
        if (currentUrl === '/') {
          this.router.navigate(['dashboard']);
        }
        this.shouldBehaveAsAuthenticated = true;
      }
      // one case will also come which will say access_token is expired
    }
  }
}
