import { AfterContentChecked, AfterContentInit, ChangeDetectorRef, EventEmitter, NgZone, OnChanges, OnDestroy, QueryList, TemplateRef } from '@angular/core';
import { NgHnlSliderConfig } from './ng-hnl-slider-config';
/**
 * Represents an individual slide to be used within a carousel.
 */
export declare class NgHnlSlide {
    tplRef: TemplateRef<any>;
    /**
     * Unique slide identifier. Must be unique for the entire document for proper accessibility support.
     * Will be auto-generated if not provided.
     */
    id: string;
    constructor(tplRef: TemplateRef<any>);
}
/**
 * Directive to easily create carousels based on Bootstrap's markup.
 */
export declare class NgHnlSlider implements AfterContentChecked, AfterContentInit, OnChanges, OnDestroy {
    private _platformId;
    private _ngZone;
    private _cd;
    slides: QueryList<NgHnlSlide>;
    private _start$;
    private _stop$;
    /**
     * The active slide id.
     */
    activeId: string;
    /**
     * Amount of time in milliseconds before next slide is shown.
     */
    interval: number;
    /**
     * Whether can wrap from the last to the first slide.
     */
    wrap: boolean;
    /**
     * A flag for allowing navigation via keyboard
     */
    keyboard: boolean;
    /**
     * A flag to enable slide cycling pause/resume on mouseover.
     * @since 2.2.0
     */
    pauseOnHover: boolean;
    /**
     * A flag to show / hide navigation arrows.
     * @since 2.2.0
     */
    showNavigationArrows: boolean;
    /**
     * A flag to show / hide navigation indicators.
     * @since 2.2.0
     */
    showNavigationIndicators: boolean;
    /**
     * A carousel slide event fired when the slide transition is completed.
     * See NgHnlSliderEvent for payload details
     */
    slide: EventEmitter<NgHnlSliderEvent>;
    constructor(config: NgHnlSliderConfig, _platformId: any, _ngZone: NgZone, _cd: ChangeDetectorRef);
    ngAfterContentInit(): void;
    ngAfterContentChecked(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: any): void;
    /**
     * Navigate to a slide with the specified identifier.
     */
    select(slideId: string): void;
    /**
     * Navigate to the next slide.
     */
    prev(): void;
    /**
     * Navigate to the next slide.
     */
    next(): void;
    /**
     * Stops the carousel from cycling through items.
     */
    pause(): void;
    /**
     * Restarts cycling through the carousel slides from left to right.
     */
    cycle(): void;
    private _cycleToSelected(slideIdx, direction);
    private _getSlideEventDirection(currentActiveSlideId, nextActiveSlideId);
    private _getSlideById(slideId);
    private _getSlideIdxById(slideId);
    private _getNextSlide(currentSlideId);
    private _getPrevSlide(currentSlideId);
}
/**
 * The payload of the slide event fired when the slide transition is completed
 */
export interface NgHnlSliderEvent {
    /**
     * Previous slide id
     */
    prev: string;
    /**
     * New slide ids
     */
    current: string;
    /**
     * Slide event direction
     */
    direction: NgHnlSliderEventDirection;
}
/**
 * Enum to define the carousel slide event direction
 */
export declare enum NgHnlSliderEventDirection {
    LEFT,
    RIGHT,
}
export declare const NG_HNL_SLIDER_DIRECTIVES: (typeof NgHnlSlide | typeof NgHnlSlider)[];
