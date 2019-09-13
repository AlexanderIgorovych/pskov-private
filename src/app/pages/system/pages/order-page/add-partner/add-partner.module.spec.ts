import { AddPartnerModule } from './add-partner.module';

describe('AddPartnerModule', () => {
  let addPartnerModule: AddPartnerModule;

  beforeEach(() => {
    addPartnerModule = new AddPartnerModule();
  });

  it('should create an instance', () => {
    expect(addPartnerModule).toBeTruthy();
  });
});
