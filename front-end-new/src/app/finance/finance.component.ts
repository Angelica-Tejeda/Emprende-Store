import { Component, OnInit } from '@angular/core';
import { MovimientoService } from 'src/services/movimiento.service';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css'],
})
export class FinanceComponent implements OnInit {
  tipo: any = [{label: "Ingreso", value: true}, {label: "Egreso", value: false}];
  selected: any;
  responses: any = {
    "status": "success",
    "message": "Movimientos obtenidos con éxito.",
    "result": {
      "count": 3,
      "rows": [
        {
          "id": "2",
          "fecha": "2022-01-13T00:00:00.000Z",
          "detalle": "Venta de quesos",
          "valor": "25.00",
          "ingreso": true
        },
        {
          "id": "3",
          "fecha": "2022-01-13T00:00:00.000Z",
          "detalle": "Compra de ingredientes",
          "valor": "-40.50",
          "ingreso": false
        },
        {
          "id": "4",
          "fecha": "2022-01-13T00:00:00.000Z",
          "detalle": "Venta de galletas",
          "valor": "12.45",
          "ingreso": true
        }
      ],
      "total": "-3.05",
      "ingresos": "37.45",
      "egresos": "-40.50"
    }
  }

  transactionForm: FormGroup = new FormGroup(
    {
      fecha: new FormControl('', Validators.required),
      detalle: new FormControl('', Validators.required),
      ingreso: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      id: new FormControl(null,null)
    },
    { updateOn: 'submit' }
  );

  constructor(private movimientoService: MovimientoService,
    private confirmationService: ConfirmationService,
    private cookieService: CookieService,
    private messageService: MessageService) { }

  ngOnInit(): void { }

  registrarTransaccion() {
    if (this.transactionForm.valid && !this.transactionForm.get('id')?.value) {
      this.transactionForm.disable();
      this.movimientoService.createMovimiento(this.transactionForm.value()).subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'user',
            severity: 'success',
            summary: 'Transacción registrada',
            detail: res.message,
            life: 3000,
          });
        },
        error: (err) => {
          console.error(err);
          if (err.status == '400') {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 3000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 3000,
            });
          }
          this.transactionForm.enable();
        },
      });
    } else {
      this.transactionForm.disable();
      this.movimientoService.updateMovimiento(+this.cookieService.get('usuario_id'),this.transactionForm.get('id')?.value,this.transactionForm.value()).subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'user',
            severity: 'success',
            summary: 'Transacción Actualizada',
            detail: res.message,
            life: 3000,
          });
        },
        error: (err) => {
          console.error(err);
          if (err.status == '400') {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 3000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 3000,
            });
          }
          this.transactionForm.enable();
        },
      });
      
    }
  }
  editarTransaccion(transaccion:any){
    this.transactionForm.get("fecha")?.setValue(new Date(transaccion.fecha));
    this.transactionForm.get("detalle")?.setValue(transaccion.detalle);
    this.transactionForm.get('ingreso')?.setValue(transaccion.ingreso);
    this.transactionForm.get('valor')?.setValue(transaccion.valor);
    this.transactionForm.get('id')?.setValue(transaccion.id);
  }
  eliminarTransaccion(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que deseas eliminar esta transacción?',
      header: 'Eliminar Transacción',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.movimientoService.deleteMovimiento(+this.cookieService.get('usuario_id'), id).subscribe({
          next: (res) => {
            this.messageService.add({
              key: 'user',
              severity: 'success',
              summary: 'Registro Eliminado',
              detail: res.message,
              life: 3000,
            });
          },
        });
      },
      reject: () => { },
    });
  }
}
