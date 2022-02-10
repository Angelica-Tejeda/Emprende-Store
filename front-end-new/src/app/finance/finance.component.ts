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
  responses: any = null;

  transactionForm: FormGroup = new FormGroup(
    {
      fecha: new FormControl(null, Validators.required),
      detalle: new FormControl(null, Validators.required),
      ingreso: new FormControl(null, Validators.required),
      valor: new FormControl(null, Validators.required),
      id: new FormControl(null,null)
    },
    { updateOn: 'submit' }
  );

  constructor(private movimientoService: MovimientoService,
    private confirmationService: ConfirmationService,
    private cookieService: CookieService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.transactionForm.reset();
    this.transactionForm.get('fecha')?.setValue(new Date());
    this.movimientoService.getMovimientosByUser(+this.cookieService.get('usuario_id')).subscribe({
      next: (res) => {
        this.responses = res;
      }
    })
  }

  registrarTransaccion() {
    if (this.transactionForm.valid && !this.transactionForm.get('id')?.value) {
      this.transactionForm.disable();
      this.movimientoService.createMovimiento(this.transactionForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'user',
            severity: 'success',
            summary: 'Transacción registrada',
            detail: res.message,
            life: 5000,
          });
          this.transactionForm.enable();
          this.transactionForm.reset();
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          if (err.status == '400') {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 5000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
            });
          }
          this.transactionForm.enable();
        },
      });
    } else {
      this.transactionForm.disable();
      this.movimientoService.updateMovimiento(+this.cookieService.get('usuario_id'),this.transactionForm.get('id')?.value,this.transactionForm.value).subscribe({
        next: (res) => {
          this.messageService.add({
            key: 'user',
            severity: 'success',
            summary: 'Transacción Actualizada',
            detail: res.message,
            life: 5000,
          });
          this.ngOnInit();
        },
        error: (err) => {
          console.error(err);
          if (err.status == '400') {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail: err.error.message,
              life: 5000,
            });
          } else {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Error',
              detail:
                'Ha ocurrido un error inesperado al procesar la petición. Por favor, inténtelo nuevamente más tarde.',
              life: 5000,
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
              life: 5000,
            });
            this.ngOnInit();
          },
          error: (err) => {
            this.messageService.add({
              key: 'user',
              severity: 'error',
              summary: 'Operacinó fallida',
              detail: "Ha ocurrido un error al procesar la petición. Intentelo nuevamente más tarde.",
              life: 5000,
            });
          }
        });
      },
      reject: () => { },
    });
  }
}
