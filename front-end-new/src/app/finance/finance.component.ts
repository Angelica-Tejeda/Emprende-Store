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
  tipo: string[] = ["Ingreso", "Egreso"];
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
      date: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      type: new FormControl('', Validators.required),
      ammount: new FormControl('', Validators.required)
    },
    { updateOn: 'submit' }
  );

  constructor(private movimientoService: MovimientoService,
    private confirmationService: ConfirmationService,
    private cookieService: CookieService,
    private messageService: MessageService) { }

  ngOnInit(): void { }

  registrarTransaccion() {
  }
  eliminarRegistro(id: number) {
    this.confirmationService.confirm({
      message: '¿Seguro que quieres de cerrar tu sesión?',
      header: 'Cerrar sesión',
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
