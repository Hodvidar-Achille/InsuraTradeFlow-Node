import { Injectable } from '@nestjs/common';
import * as model from '../../domain';
import * as api from '../../api';
import * as db from '../../persistence';
import * as domain from "domain";

@Injectable()
export class InsurancePolicyService {
    constructor(
        private readonly mapper: model.InsurancePolicyMapper,
        private readonly repository: db.InsurancePolicyRepository,
        private readonly validator: model.InsurancePolicyValidator
    ) {}

    async createInsurancePolicy(dto: api.InsurancePolicyDto): Promise<model.InsurancePolicy> {
        const newInsurancePolicy = this.mapper.dtoToModel(dto);
        this.validator.validate(newInsurancePolicy);

        const entity = this.mapper.modelToEntity(newInsurancePolicy);
        const savedEntity = await this.repository.save(entity);
        const savedPolicy = this.mapper.entityToModel(savedEntity);

        console.log(`Created a new Insurance Policy: ${JSON.stringify(savedPolicy)}`);
        return savedPolicy;
    }

    async getAllInsurancePolicies(pageable: Pageable): Promise<Page<InsurancePolicy>> {
        const policyPage = await this.repository.findAll(pageable);
        return {
            ...policyPage,
            content: policyPage.content.map(entity => this.mapper.entityToModel(entity))
        };
    }

    async getInsurancePolicyById(id: number): Promise<InsurancePolicy | null> {
        const entity = await this.repository.findById(id);
        return entity ? this.mapper.entityToModel(entity) : null;
    }

    async updateInsurancePolicy(id: number, dto: api.InsurancePolicyDto): Promise<model.InsurancePolicy> {
        const existingEntity = await this.repository.findById(id);
        if (!existingEntity) {
            console.log(`No Insurance Policy found for given id '${id}', update action cannot be performed`);
            throw new Error(`No Insurance Policy for given id '${id}'`);
        }

        const updatedPolicy = this.mapper.dtoToModel(dto);
        this.validator.validate(updatedPolicy);

        // Merge changes with existing policy
        const updatedEntity = this.mapper.modelToEntity({
            ...this.mapper.entityToModel(existingEntity),
            ...updatedPolicy,
            id // Ensure ID remains the same
        });

        const savedEntity = await this.repository.saveAndFlush(updatedEntity);
        const savedPolicy = this.mapper.entityToModel(savedEntity);

        console.log(`Updated Insurance Policy: ${JSON.stringify(savedPolicy)}`);
        return savedPolicy;
    }

    async deleteInsurancePolicy(id: number): Promise<model.InsurancePolicy | null> {
        const existingEntity = await this.repository.findById(id);

        if (!existingEntity) {
            console.log(`No Insurance Policy for given id '${id}', deletion action does nothing`);
            throw new Error(`No Insurance Policy for given id '${id}'`);
        }

        await this.repository.delete(existingEntity);
        console.log(`Deleted an Insurance Policy: ${JSON.stringify(existingEntity)}`);

        return this.mapper.entityToModel(existingEntity);
    }
}