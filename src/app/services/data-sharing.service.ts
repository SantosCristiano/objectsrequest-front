import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilialDTO } from '../model/filialDTO.model';
import { StatusDTO } from '../model/statusDTO.model';

@Injectable()
export class DataSharingService {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public filialDTO: BehaviorSubject<FilialDTO[]> = new BehaviorSubject<FilialDTO[]>([]);
    public statusDTO: BehaviorSubject<StatusDTO[]> = new BehaviorSubject<StatusDTO[]>([]);
    public codigoDoPedido: BehaviorSubject<number> = new BehaviorSubject<number>(null);




}
