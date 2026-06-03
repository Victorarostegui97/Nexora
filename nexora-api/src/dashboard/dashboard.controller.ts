import { Controller, Get } from '@nestjs/common';

import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

  constructor(
    private dashboardService: DashboardService
  ) {}

  @Get('summary')
  getSummary() {
    return this.dashboardService.getSummary();
  }

  @Get('low-stock')
  getLowStockProducts() {

    return this.dashboardService
      .getLowStockProducts();

  }

  @Get('recent-movements')
  getRecentMovements() {

    return this.dashboardService
      .getRecentMovements();

  }

}