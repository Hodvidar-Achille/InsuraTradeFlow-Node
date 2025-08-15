// src/node/network/controllers/network.controller.ts

import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger'; // Optional for Swagger docs

@Controller('api')
@ApiTags('Network Test') // Optional for Swagger documentation
export class NetworkController {

    @Get('greeting')
    getGreeting(): { message: string } {
        // White listed endpoint used for test
        return { message: 'Hello from NestJS!' };
    }

    @Get('network-test')
    networkTest(): string {
        // Non-white listed endpoint used for test
        return 'Network connection successful';
    }
}