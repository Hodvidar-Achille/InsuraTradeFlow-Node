import { InsurancePolicyStatus } from './insurance-policy-status.enum';

export class InsurancePolicy {
    id?: number;
    name: string;
    status: InsurancePolicyStatus;
    startDate: Date;
    endDate: Date;
    creationDateTime?: Date;
    updateDateTime?: Date;
}