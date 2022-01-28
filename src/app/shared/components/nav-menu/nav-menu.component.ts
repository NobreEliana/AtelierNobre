import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.less']
})
export class NavMenuComponent {
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  @ViewChild('btnNavbar', { static: false }) btnNavElement: ElementRef;
  user: any = {};
  sticky: boolean = false;
  elementPosition: any;

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll')
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    }
    else {
      this.sticky = false;
    }
  }
  collapse() {
    if (window.innerWidth < 768) {
      this.btnNavElement.nativeElement.click();
    }
  }
}