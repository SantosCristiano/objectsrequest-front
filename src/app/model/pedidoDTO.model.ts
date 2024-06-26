import { PedidoProdutosDTO } from './pedidoProdutosDTO.model';
import { TransporteDTO } from './transporteDTO.model';

export class PedidoDTO {

        idPedido: number;
        stPstatusData: Date = new Date();
        PstatusData: string;
        stPstatusUsuario: string;
        stPstatusStatus: string;
        nomeLocalizacao: string;
        tipoPedido: string;
        idTarefa: number;
        prodTarefa: string;
        nSerie: number;
        dtAbertura: Date;
        abertura: string;
        dtAgendamento: Date;
        agendamento: string;
        prazoAtendimento: Date;
        atendimento: string;
        prazoSolucao: Date;
        solucao: string;
        descricaoDoEquipamento: string;
        numeroDeSerieDoEquipamento: string;
        catEquipamento: string;
        idSite: string;
        nmSite: string;
        enderecoSite: string;
        regiaoTecnica: number;
        nomeFilial: string;
        cliente: string;
        idTecnico: number;
        erpId: number;
        nmTecnico: string;
        produto: Array<PedidoProdutosDTO> = [];
        eaLogradouro: string;
        eaCep: string;
        eaBairro: string;
        eaCidade: string;
        eaNum: string;
        dtEntrega: Date;
        entrega: string;
        nomeEntregador: string;
        telefoneEntregador: string;
        observacao: string;
        buscaPedido: boolean;
        transporte: TransporteDTO;
        integradoTotvs: boolean;
        mensagemTotvs: string;
        viaMobile: boolean;
}
