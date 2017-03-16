"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var router_1 = require('@angular/router');
var app_component_1 = require('./app.component');
var home_component_1 = require('./home/home.component');
var aboutus_component_1 = require('./aboutus/aboutus.component');
var contactus_component_1 = require('./contactus/contactus.component');
var header_component_1 = require('./layout/header/header.component');
var footer_component_1 = require('./layout/footer/footer.component');
var maincontent_component_1 = require('./layout/main/maincontent.component');
var appRoutes = [
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
    { path: 'Home', component: home_component_1.HomeComponent },
    { path: 'ContactUs', component: contactus_component_1.ContactUsComponent },
    { path: 'AboutUs', component: aboutus_component_1.AboutUsComponent },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
];
//enableProdMode();
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, router_1.RouterModule.forRoot(appRoutes)],
            declarations: [home_component_1.HomeComponent, app_component_1.AppComponent, aboutus_component_1.AboutUsComponent, contactus_component_1.ContactUsComponent,
                header_component_1.HeaderComponent, footer_component_1.FooterComponent, maincontent_component_1.MainComponent],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
