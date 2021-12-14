import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  categorias: Array<string> = [
    "Comestibles",
    "Aperitivos",
    "Postres",
    "Vegano",
    "Vegetarieno",
    "Sin gluten",
    "Saludable",
    "Comida rápida",
    "Pan y harinas",
    "Pastas",
    "Ensaladas",
    "Bebidas",
    "Lacteos",
    "Artesanias",
    "Otros",
    "Frutas",
    "Vegetales",
    "Mascotas"
  ];
  productForm = new FormGroup({
    tipo: new FormControl('', Validators.required),
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categorias: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    descuento: new FormControl('', Validators.required),
  });
  constructor() { }

  onSubmit() { }

  ngOnInit(): void {
  }

}
