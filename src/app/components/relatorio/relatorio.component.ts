import { Data } from '@angular/router';
import { PedidoService } from './../../services/pedido-service';
import { Component, Input, OnInit, Pipe } from '@angular/core';
import { PedidoDTO } from "../../model/pedidoDTO.model";
import { FiltrosDTO } from "../../model/filtrosDTO.model";
import { DatePipe } from '@angular/common';
import { jsPDF } from "jspdf";
import * as FileSaver from 'file-saver';
import * as autoTable from 'jspdf-autotable';
import "jspdf-autotable";

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.sass'],
  providers: [DatePipe]
})
export class RelatorioComponent implements OnInit {
  filtros: FiltrosDTO = new FiltrosDTO();
  pedidos: PedidoDTO[];
  cols: any[];
  exportColumns: any[];
  _exportColumns: any[];
  _selectedColumns: any[];

  constructor(private pedidoService: PedidoService, private datePipe: DatePipe) { }

  ngOnInit() {

    this.pedidoService.pedidoTodos(this.filtros).subscribe(data => {
      this.pedidos = data["pDto"]


      for (let index = 0; index < this.pedidos.length; index++) {
        if(this.pedidos[index].stPstatusData != null) {
          this.pedidos[index].PstatusData = this.datePipe.transform(this.pedidos[index].stPstatusData, 'dd/MM/yyyy')
        }
        if(this.pedidos[index].dtAbertura != null) {
          this.pedidos[index].abertura = this.datePipe.transform(this.pedidos[index].dtAbertura, 'dd/MM/yyyy')
        }
        if(this.pedidos[index].dtAgendamento != null) {
          this.pedidos[index].agendamento = this.datePipe.transform(this.pedidos[index].dtAgendamento, 'dd/MM/yyyy')
        }
        if(this.pedidos[index].prazoAtendimento != null) {
          this.pedidos[index].atendimento = this.datePipe.transform(this.pedidos[index].prazoAtendimento, 'dd/MM/yyyy')
        }
        if(this.pedidos[index].prazoSolucao != null) {
          this.pedidos[index].solucao = this.datePipe.transform(this.pedidos[index].prazoSolucao, 'dd/MM/yyyy')
        }
        if(this.pedidos[index].dtEntrega != null) {
          this.pedidos[index].entrega = this.datePipe.transform(this.pedidos[index].dtEntrega, 'dd/MM/yyyy')
        }
      }
      console.log(this.pedidos)
    } );

    this.cols = [
      { field: 'idPedido', header: 'ID' },
      { field: 'stPstatusUsuario', header: 'Atendente' },
      { field: 'PstatusData', header: 'Data' },
      { field: 'stPstatusStatus', header: 'Status' },
      { field: 'nomeLocalizacao', header: 'Localização' },
      { field: 'tipoPedido', header: 'Tipo' },
      { field: 'idTarefa', header: 'Tarefa' },
      { field: 'prodTarefa', header: 'Prod. Tarefa' },
      { field: 'nSerie', header: 'Serie' },
      { field: 'abertura', header: 'Abertura' },
      { field: 'agendamento', header: 'Agendamento' },
      { field: 'atendimento', header: 'Atendimento' },
      { field: 'solucao', header: 'Solução' },
      { field: 'descricaoDoEquipamento', header: 'Descrição' },
      { field: 'numeroDeSerieDoEquipamento', header: 'Serie Equip.' },
      { field: 'catEquipamento', header: 'CAT' },
      { field: 'idSite', header: 'Id Site' },
      { field: 'nmSite', header: 'Site' },
      { field: 'regiaoTecnica', header: 'Regiao Tec.' },
      { field: 'nomeFilial', header: 'Filial' },
      { field: 'cliente', header: 'Cliente' },
      { field: 'idTecnico', header: 'Id Técnico' },
      { field: 'erpId', header: 'ERP' },
      { field: 'nmTecnico', header: 'Técnico' },
      // { field: 'produto', header: 'Produto' },
      { field: 'eaLogradouro', header: 'Rua' },
      { field: 'eaCep', header: 'CEP' },
      { field: 'eaBairro', header: 'Bairro' },
      { field: 'eaCidade', header: 'Cidade' },
      { field: 'eaNum', header: 'Número' },
      { field: 'entrega', header: 'Entrega' },
      { field: 'nomeEntregador', header: 'Entregador' },
      { field: 'telefoneEntregador', header: 'Telefone' },
      { field: 'observacao', header: 'Observação' },
      { field: 'buscaPedido', header: 'Busca' },
  ];

  this._selectedColumns = this.cols;

  this.exportColumns = this.cols.map(col => ({title: col.header, dataKey: col.field}));

  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  exportPdf() {
    const doc = new jsPDF('l','px');
    doc['autoTable'](this.exportColumns, this.pedidos);
    doc.save("pedidos.pdf");
  }

  exportExcel() {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(this.pedidos);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer, "pedidos");
      });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }
}
