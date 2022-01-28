import { ApplicationRef, Component, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { IModal } from 'src/app/shared/models/modal';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  componentRef: ComponentRef<Component>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector) { }


  private appendModal(type: IModal) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type.component);
    const componentRef = componentFactory.create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    domElem.firstChild['style'].top=type.position.top;
    domElem.firstChild['style'].left=type.position.left;
    
    document.querySelector(type.nextToElement).appendChild(domElem);

    this.componentRef = componentRef;
    this.componentRef.instance['overlay'] = type.overlay;
    this.componentRef.instance['redirectTo'] = type.redirectTo;
    this.componentRef.instance['nextToElement'] = type.nextToElement;
    this.componentRef.instance['position'] = type.position;
    
  }

  private removeModal() {
    if(this.componentRef){
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
    }
  }

  public remove() {
    this.removeModal();
  }

  public add(type: IModal) {
    this.appendModal(type);
  }
}