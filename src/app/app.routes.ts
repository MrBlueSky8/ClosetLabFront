import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import path from 'path';
import { segGuard } from './guard/seguridad.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditausuariosComponent } from './components/usuarios/creaeditausuarios/creaeditausuarios.component';
import { TipousuarioComponent } from './components/tipousuario/tipousuario.component';
import { CreaeditatiposusuarioComponent } from './components/tipousuario/creaeditatiposusuario/creaeditatiposusuario.component';
import { EstadocarritoComponent } from './components/estadocarrito/estadocarrito.component';
import { CreaeditaestadocarritoComponent } from './components/estadocarrito/creaeditaestadocarrito/creaeditaestadocarrito.component';
import { MarcaComponent } from './components/marca/marca.component';
import { CreaeditamarcaComponent } from './components/marca/creaeditamarca/creaeditamarca.component';
import { TallaComponent } from './components/talla/talla.component';
import { CreaeditatallaComponent } from './components/talla/creaeditatalla/creaeditatalla.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CreaeditacategoriaComponent } from './components/categoria/creaeditacategoria/creaeditacategoria.component';
import { TipoprendaComponent } from './components/tipoprenda/tipoprenda.component';
import { CreaeditatipoprendaComponent } from './components/tipoprenda/creaeditatipoprenda/creaeditatipoprenda.component';
import { MetodopagoComponent } from './components/metodopago/metodopago.component';
import { CreaeditametodopagoComponent } from './components/metodopago/creaeditametodopago/creaeditametodopago.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { CreaeditacarritoComponent } from './components/carrito/creaeditacarrito/creaeditacarrito.component';
import { PrendaComponent } from './components/prenda/prenda.component';
import { CreaeditaprendaComponent } from './components/prenda/creaeditaprenda/creaeditaprenda.component';
import { ReseniaprendaComponent } from './components/reseniaprenda/reseniaprenda.component';
import { CreaeditareniaprendaComponent } from './components/reseniaprenda/creaeditareniaprenda/creaeditareniaprenda.component';
import { CarritoprendaComponent } from './components/carritoprenda/carritoprenda.component';
import { CreaeditacarritoprendaComponent } from './components/carritoprenda/creaeditacarritoprenda/creaeditacarritoprenda.component';
import { PagoComponent } from './components/pago/pago.component';
import { CreaeditapagoComponent } from './components/pago/creaeditapago/creaeditapago.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { HistorialcomprasusuarioComponent } from './components/reportes/historialcomprasusuario/historialcomprasusuario.component';
import { InventariocriticoComponent } from './components/reportes/inventariocritico/inventariocritico.component';
import { ClientesactivosxmesComponent } from './components/reportes/clientesactivosxmes/clientesactivosxmes.component';
import { FiltrarprendasxtallaymarcaComponent } from './components/reportes/filtrarprendasxtallaymarca/filtrarprendasxtallaymarca.component';
import { ObtenerReporteCalificacionesProductosDTO } from './models/obtenerReporteCalificacionesProductosDTO';
import { ObtenercalificacionesproductosComponent } from './components/reportes/obtenercalificacionesproductos/obtenercalificacionesproductos.component';
import { ObtenerreseniaxprendaComponent } from './components/reportes/obtenerreseniaxprenda/obtenerreseniaxprenda.component';
import { ObtenerPrendasMasVendidasPorMarcaDTO } from './models/obtenerPrendasMasVendidasPorMarcaDTO';
import { ObtenerprendasmasvendidaspormarcaComponent } from './components/reportes/obtenerprendasmasvendidaspormarca/obtenerprendasmasvendidaspormarca.component';
import { ObtenermetodospagomasusadosComponent } from './components/reportes/obtenermetodospagomasusados/obtenermetodospagomasusados.component';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'landing',
    component: LandingpageComponent,
  },
  {
      path:'usuarios',component:UsuariosComponent,
      children:[
          {
              path:'nuevo',component:CreaeditausuariosComponent
          },
          {
              path:'ediciones/:id', component:CreaeditausuariosComponent
          },
          {
              path:'detalle/:id', component:CreaeditausuariosComponent
          },
          {
              path:'registro', component:CreaeditausuariosComponent
          }
      ],
      //canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'tiposdeusuario',component:TipousuarioComponent,
      children:[
          {
              path:'nuevo',component:CreaeditatiposusuarioComponent
          },
          {
              path:'ediciones/:id', component:CreaeditatiposusuarioComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'estadoscarrito',component:EstadocarritoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditaestadocarritoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditaestadocarritoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'marca',component:MarcaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditamarcaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditamarcaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'talla',component:TallaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditatallaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditatallaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'categoria',component:CategoriaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditacategoriaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditacategoriaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'tiposdeprenda',component:TipoprendaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditatipoprendaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditatipoprendaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'metodopago',component:MetodopagoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditametodopagoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditametodopagoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'carrito',component:CarritoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditacarritoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditacarritoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'prenda',component:PrendaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditaprendaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditaprendaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'reseñaprenda',component:ReseniaprendaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditareniaprendaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditareniaprendaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'carritoPrenda',component:CarritoprendaComponent,
      children:[
          {
              path:'nuevo',component:CreaeditacarritoprendaComponent
          },
          {
              path:'ediciones/:id', component:CreaeditacarritoprendaComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'pago',component:PagoComponent,
      children:[
          {
              path:'nuevo',component:CreaeditapagoComponent
          },
          {
              path:'ediciones/:id', component:CreaeditapagoComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
      path:'reportes',component:ReportesComponent,
      children:[
          {
              path:'reporte02',component:HistorialcomprasusuarioComponent
          },
          {
              path:'reporte03',component:InventariocriticoComponent
          },
          {
              path:'reporte04',component:ClientesactivosxmesComponent
          },
          {
              path:'reporte05',component:FiltrarprendasxtallaymarcaComponent
          },
          {
              path:'reporte06',component:ObtenercalificacionesproductosComponent
          },
          {
              path:'reporte07',component:ObtenerreseniaxprendaComponent
          },
          {
              path:'reporte08',component:ObtenerprendasmasvendidaspormarcaComponent
          },
          {
              path:'reporte09',component:ObtenermetodospagomasusadosComponent
          }
      ],
      canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },
  {
    path: 'homes',
    component: HomeComponent,
    canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
  },

];
