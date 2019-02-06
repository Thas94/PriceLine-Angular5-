import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bidresults',
  templateUrl: './bidresults.component.html',
  styleUrls: ['./bidresults.component.css']
})
export class BidresultsComponent implements OnInit {

  constructor() { }

  body : any;

  ngOnInit() {

    this.body = JSON.parse(localStorage.getItem("body"))
    
    console.log("lll",this.body)
  }

}
