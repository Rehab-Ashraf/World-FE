import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  constructor(public snackBar: MatSnackBar) {}

  // this function will open up snackbar on top right position with custom background color (defined in css)
  error(message: string, action?: string, className?: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      verticalPosition: "bottom",
      horizontalPosition: "center",
      panelClass: ["error-alert"],
    });
  }

  success(message: string, action?: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  ngOnInit(): void {
  }

}
