import { GET_AFFILIATES } from '../main.actions';
import {AffiliateEntity} from '../../../shared/entitys/affiliate.entity';

export class PropertyActions {
  getAffiliates(affiliates: AffiliateEntity[]) {
    return { type: GET_AFFILIATES, data: { affiliates } };
  }
}
