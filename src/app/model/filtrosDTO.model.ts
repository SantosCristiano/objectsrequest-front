import { TransporteDTO } from './transporteDTO.model';
import { Data } from '@angular/router';
import { TipoPedido } from './tipoPedido.model';
import { StatusDTO } from './statusDTO.model';
import { LocalizacaoDTO } from './localizacaoDTO.model';
import { TipoPedidoDTO } from './tipoPedidoDTO.model';
import { ProdutoDTO } from './produtoDTO.model';
import { FilialDTO } from './filialDTO.model';
import { BomDTO } from './bomDTO.model';
import { EquipamentoDTO } from './equipamentoDTO.model';

export class FiltrosDTO {
        statusDTO: StatusDTO[] = [];
        localizacaoDTO: LocalizacaoDTO[] = [];
        tipoPedidoDTO: TipoPedidoDTO[] = [];
        produtoDTO: ProdutoDTO[] = [];
        filialDTO: FilialDTO[] = [];
        equipamentoDTO: EquipamentoDTO[] = [];
        transporteDTO: TransporteDTO[] = [];
        idPedido: number;
        idTecnico: number;
}
