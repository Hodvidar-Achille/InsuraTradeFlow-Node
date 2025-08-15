import { Injectable } from '@nestjs/common';
import * as domain from '../index';
import * as api from '../../api';
import * as db from '../../persistence';

@Injectable()
export class InsurancePolicyMapper {
    dtoToModel(dto: api.InsurancePolicyDto): domain.InsurancePolicy {
        const model = new domain.InsurancePolicy();
        model.name = dto.name;
        model.status = dto.status as domain.InsurancePolicyStatus;
        model.startDate = new Date(dto.startDate);
        model.endDate = new Date(dto.endDate);
        return model;
    }

    modelToEntity(model: domain.InsurancePolicy): db.InsurancePolicyDao {
        const entity = new db.InsurancePolicyDao();
        entity.name = model.name;
        entity.status = model.status;
        entity.startDate = model.startDate;
        entity.endDate = model.endDate;
        return entity;
    }

    entityToModel(entity?: db.InsurancePolicyDao | null ): domain.InsurancePolicy | null | undefined {
        if(entity === null) return null;
        if(entity === undefined) return undefined;
        const model = new domain.InsurancePolicy();
        model.id = entity.id;
        model.name = entity.name;
        model.status = entity.status as domain.InsurancePolicyStatus;
        model.startDate = entity.startDate;
        model.endDate = entity.endDate;
        model.creationDateTime = entity.creationDateTime;
        model.updateDateTime = entity.updateDateTime;
        return model;
    }

    modelToDto(model: domain.InsurancePolicy | null): api.InsurancePolicyDto | null {
        if (model === null) {
            return null;
        }

        const dto = new api.InsurancePolicyDto();
        dto.id = model.id;
        dto.name = model.name;
        dto.status = model.status;
        dto.startDate = model.startDate.toISOString().split('T')[0]; // YYYY-MM-DD
        dto.endDate = model.endDate.toISOString().split('T')[0];     // YYYY-MM-DD
        dto.creationDateTime = model.creationDateTime?.toISOString();
        dto.updateDateTime = model.updateDateTime?.toISOString();
        return dto;
    }
}