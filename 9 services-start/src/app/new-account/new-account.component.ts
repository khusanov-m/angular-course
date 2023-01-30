import { AccountService } from './../accounts.service';
import { Component, OnDestroy } from '@angular/core';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css'],
  // providers: [LoggingService],
})
export class NewAccountComponent implements OnDestroy {
  constructor(
    // private loggingService: LoggingService,
    private accountService: AccountService
  ) {
    this.accountService.statusUpdated.subscribe((status) =>
      alert('New Status: ' + status)
    );
  }

  onCreateAccount(accountName: string, accountStatus: string) {
    this.accountService.addAccount(accountName, accountStatus);
    // this.loggingService.logStatusChange(accountStatus);
  }

  ngOnDestroy(): void {
    this.accountService.statusUpdated.unsubscribe();
  }
}
