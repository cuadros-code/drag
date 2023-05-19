import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { dataSeguros } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('action') action!: ElementRef<HTMLDivElement>;
  openAction: boolean = false;
  actionCounter: number = 0;
  initialY: number = 0;
  endY: number = 0;
  seguros = dataSeguros;
  listToComparete: any[] = [];

  openActionSheet(){
    this.openAction 
      ? this.action.nativeElement.style.height = '80vh'
      : this.action.nativeElement.style.height = '10vh'
    this.openAction = !this.openAction;
  }

  onDrag( event: TouchEvent ){
    this.actionCounter++;
    if(this.actionCounter == 1){
      this.initialY = event.touches[0].clientY
    }
    if(this.actionCounter == 10){
      this.endY = event.touches[0].clientY
    }

    
    if(this.actionCounter == 15){
      if(this.initialY > this.endY){
        this.action.nativeElement.style.height = '80vh'
      } else {
        this.action.nativeElement.style.height = '10vh'
      }
    }
  }

  onDragEnd( event: TouchEvent ){
    this.actionCounter = 0;
  }

  onAddItem( item: any ){
    this.listToComparete.push(item)
    if(this.listToComparete.length >= 1){
      this.action.nativeElement.style.height = '30vh'
      this.openAction = true;
    }
  }

}
