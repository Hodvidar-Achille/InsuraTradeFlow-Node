import {Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus, HttpCode} from '@nestjs/common';
import * as domain from '../../domain';
import * as api from '../../api';

@Controller('api/v1/insurance-policies')
export class InsurancePolicyController {
    constructor(
        private readonly insurancePolicyService: domain.InsurancePolicyService,
        private readonly insurancePolicyMapper: domain.InsurancePolicyMapper
    ) {
    }

    @Post()
    async createInsurancePolicy(
        @Body() insurancePolicyDto: api.InsurancePolicyDto,
    ): Promise<api.InsurancePolicyDto> {
        const createdPolicy = await this.insurancePolicyService.createInsurancePolicy(insurancePolicyDto);
        return this.insurancePolicyMapper.modelToDto(createdPolicy);
    }

    @Get()
    async getAllInsurancePolicies(
        @Query() pageOptionsDto: api.PageOptionsDto,
    ): Promise<api.PageDto<api.InsurancePolicyDto>> {
        const [policies, itemCount] = await this.insurancePolicyService.getAllInsurancePolicies(pageOptionsDto);

        const pageMetaDto = new PageMetaDto({
            itemCount,
            pageOptionsDto,
        });

        return new PageDto(
            policies.map(policy => this.insurancePolicyMapper.modelToDto(policy)),
            pageMetaDto,
        );
    }

    @Get(':id')
    async getInsurancePolicy(@Param('id') id: number): Promise<api.InsurancePolicyDto | null>  {
        const policy = await this.insurancePolicyService.getInsurancePolicyById(id);
        if (!policy) {
            throw new Error(`Insurance Policy with id ${id} not found`);
        }
        return this.insurancePolicyMapper.modelToDto(policy);
    }

    @Put(':id')
    async updateInsurancePolicy(
        @Param('id') id: number,
        @Body() insurancePolicyDto: api.InsurancePolicyDto,
    ): Promise<api.InsurancePolicyDto | null | undefined> {
        const updatedPolicy = await this.insurancePolicyService.updateInsurancePolicy(id, insurancePolicyDto);
        return this.insurancePolicyMapper.modelToDto(updatedPolicy);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT) // 204 for successful deletion
    async deleteInsurancePolicy(@Param('id') id: number): Promise<api.InsurancePolicyDto | null> {
        const deletedPolicy = await this.insurancePolicyService.deleteInsurancePolicy(id);
        if (!deletedPolicy) {
            throw new Error(`Insurance Policy with id ${id} not found`);
        }
        return deletedPolicy ? this.insurancePolicyMapper.modelToDto(deletedPolicy) : null;
    }
}