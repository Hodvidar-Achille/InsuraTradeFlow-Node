import { Injectable } from '@nestjs/common';
import type {InsurancePolicy} from '../models/insurance-policy.model';
import {InsurancePolicyValidationError} from '../exceptions/insurance-policy-validation.error';

@Injectable()
export class InsurancePolicyValidator {

    validate(insurancePolicy: InsurancePolicy): void {
        if (!insurancePolicy) {
            throw new InsurancePolicyValidationError('Given insurance policy is null');
        }

        if (!insurancePolicy.name || insurancePolicy.name.trim() === '') {
            throw new InsurancePolicyValidationError('Insurance policy name cannot be null or blank');
        }

        if (!insurancePolicy.startDate) {
            throw new InsurancePolicyValidationError('Insurance policy start date cannot be null');
        }

        if (!insurancePolicy.endDate) {
            throw new InsurancePolicyValidationError('Insurance policy end date cannot be null');
        }

        if (insurancePolicy.startDate >= insurancePolicy.endDate) {
            throw new InsurancePolicyValidationError('Insurance policy start date cannot be after or equal to end date');
        }
    }
}