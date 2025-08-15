import { DataSource, Repository } from 'typeorm';
import * as domain from '../../domain';
import * as api from '../../api'; // bad design
import * as db from '../';

export class InsurancePolicyRepository extends Repository<db.InsurancePolicyDao> {

    constructor(private dataSource: DataSource) {
        super(domain.InsurancePolicy, dataSource.createEntityManager());
    }

    async findAllPaginated(paginationDto: api.PaginationDto): Promise<api.PaginatedResultDto<db.InsurancePolicyDao>> {
        const { page = 1, limit = 10 } = paginationDto;
        const skip = (page - 1) * limit;

        const [data, total] = await this.findAndCount({
            skip,
            take: limit,
            order: { id: 'ASC' } // Default ordering
        });

        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    }

    // Find by ID
    async findById(id: number): Promise<db.InsurancePolicyDao | null> {
        return this.findOne({ where: { id } });
    }

    // Create
    async createPolicy(policy: Partial<db.InsurancePolicyDao>): Promise<db.InsurancePolicyDao> {
        const newPolicy = this.create(policy);
        return this.save(newPolicy);
    }

    // Update
    async updatePolicy(id: number, policyData: Partial<db.InsurancePolicyDao>): Promise<db.InsurancePolicyDao | null> {
        await this.update(id, policyData);
        return this.findById(id);
    }

    // Delete
    async deletePolicy(id: number): Promise<boolean> {
        const result = await this.delete(id);
        return result.affected > 0;
    }

// If need filtered pagination later:
    /*
    async findByNamePaginated(
      nameFilter: string,
      paginationDto: PaginationDto
    ): Promise<PaginatedResultDto<InsurancePolicy>> {
      const { page = 1, limit = 10 } = paginationDto;
      const skip = (page - 1) * limit;

      const [data, total] = await this.createQueryBuilder('policy')
        .where('policy.name LIKE :name', { name: `%${nameFilter}%` })
        .skip(skip)
        .take(limit)
        .orderBy('policy.id', 'ASC')
        .getManyAndCount();

      return {
        data,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    }
    */
}