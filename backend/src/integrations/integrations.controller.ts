import { Controller, Post, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';

@Controller('integrations')
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Post('webhook/:platform')
    @HttpCode(HttpStatus.OK)
    async handleWebhook(@Param('platform') platform: string, @Body() payload: any) {
        console.log(`Received webhook for ${platform}`);
        return this.integrationsService.processWebhook(platform, payload);
    }
}
