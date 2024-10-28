import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-microemployer',
  templateUrl: './microemployer.component.html',
  styleUrl: './microemployer.component.css'
})
export class MicroemployerComponent implements OnInit{
  
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
   
  }
}
