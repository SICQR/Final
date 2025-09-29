/**
 * Advanced Analytics Module for HOTMESS business suite
 * Funnel analytics, enhanced KPI dashboard, and custom reporting
 */

interface AnalyticsEvent {
  id: string;
  userId?: string;
  sessionId: string;
  eventType: string;
  eventName: string;
  properties: Record<string, any>;
  timestamp: Date;
  source: 'web' | 'mobile' | 'api' | 'telegram' | 'shopify';
  ipAddress: string;
  userAgent: string;
  referrer?: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
  page?: {
    url: string;
    title: string;
    path: string;
  };
}

interface FunnelStep {
  id: string;
  name: string;
  eventName: string;
  conditions?: Array<{
    property: string;
    operator: 'equals' | 'contains' | 'greater' | 'less' | 'exists';
    value: any;
  }>;
  order: number;
  timeWindow?: number; // minutes
}

interface Funnel {
  id: string;
  name: string;
  description: string;
  steps: FunnelStep[];
  dateRange: {
    start: Date;
    end: Date;
  };
  filters?: Array<{
    property: string;
    operator: string;
    value: any;
  }>;
  segments?: string[];
}

interface FunnelResult {
  funnelId: string;
  totalUsers: number;
  steps: Array<{
    stepId: string;
    stepName: string;
    users: number;
    conversionRate: number;
    dropoffRate: number;
    avgTimeToNext?: number; // minutes
  }>;
  overallConversionRate: number;
  generatedAt: Date;
}

interface KPI {
  id: string;
  name: string;
  category: 'sales' | 'marketing' | 'affiliate' | 'radio' | 'engagement' | 'retention';
  description: string;
  formula: string;
  query: string;
  targetValue?: number;
  thresholds: {
    good: number;
    warning: number;
    critical: number;
  };
  format: 'number' | 'percentage' | 'currency' | 'duration';
  refreshInterval: number; // minutes
  isActive: boolean;
}

interface KPIValue {
  kpiId: string;
  value: number;
  change: number; // vs previous period
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
  status: 'good' | 'warning' | 'critical';
  timestamp: Date;
  period: string;
}

interface Report {
  id: string;
  name: string;
  description: string;
  type: 'scheduled' | 'on_demand' | 'real_time';
  format: 'json' | 'csv' | 'pdf' | 'excel';
  template: string;
  parameters: Record<string, any>;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    time: string; // HH:MM
    timezone: string;
    recipients: string[];
  };
  sections: ReportSection[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ReportSection {
  id: string;
  name: string;
  type: 'chart' | 'table' | 'kpi' | 'text' | 'funnel';
  query: string;
  visualization?: {
    chartType: 'line' | 'bar' | 'pie' | 'area' | 'scatter';
    xAxis: string;
    yAxis: string;
    groupBy?: string;
  };
  order: number;
}

interface Cohort {
  id: string;
  name: string;
  definition: {
    startEvent: string;
    conditions: Array<{
      property: string;
      operator: string;
      value: any;
    }>;
  };
  returnEvent: string;
  periods: number[];
  dateRange: {
    start: Date;
    end: Date;
  };
}

interface CohortAnalysis {
  cohortId: string;
  cohorts: Array<{
    period: string;
    size: number;
    retention: number[];
  }>;
  averageRetention: number[];
  generatedAt: Date;
}

export class AdvancedAnalytics {
  private events: Map<string, AnalyticsEvent> = new Map();
  private funnels: Map<string, Funnel> = new Map();
  private kpis: Map<string, KPI> = new Map();
  private reports: Map<string, Report> = new Map();
  private cohorts: Map<string, Cohort> = new Map();

  constructor() {
    this.initializeDefaultKPIs();
    this.initializeDefaultFunnels();
  }

  /**
   * Track analytics event
   */
  async trackEvent(eventData: Omit<AnalyticsEvent, 'id' | 'timestamp'>): Promise<void> {
    const event: AnalyticsEvent = {
      ...eventData,
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
    };

    this.events.set(event.id, event);
    await this.saveEvent(event);

    // Process real-time analytics
    await this.processRealTimeEvent(event);
  }

  /**
   * Create funnel analysis
   */
  async createFunnel(funnelData: Omit<Funnel, 'id'>): Promise<Funnel> {
    const funnel: Funnel = {
      ...funnelData,
      id: `funnel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    this.funnels.set(funnel.id, funnel);
    await this.saveFunnel(funnel);

    return funnel;
  }

  /**
   * Run funnel analysis
   */
  async runFunnelAnalysis(funnelId: string): Promise<FunnelResult> {
    const funnel = this.funnels.get(funnelId);
    if (!funnel) {
      throw new Error('Funnel not found');
    }

    const events = await this.getEventsInDateRange(funnel.dateRange.start, funnel.dateRange.end);
    const result = await this.calculateFunnelMetrics(funnel, events);

    await this.saveFunnelResult(result);
    return result;
  }

  /**
   * Get KPI dashboard data
   */
  async getKPIDashboard(): Promise<Array<KPI & { currentValue: KPIValue }>> {
    const activeKPIs = Array.from(this.kpis.values()).filter(kpi => kpi.isActive);
    const dashboard: Array<KPI & { currentValue: KPIValue }> = [];

    for (const kpi of activeKPIs) {
      const currentValue = await this.calculateKPI(kpi);
      dashboard.push({
        ...kpi,
        currentValue,
      });
    }

    return dashboard;
  }

  /**
   * Create custom report
   */
  async createReport(reportData: Omit<Report, 'id' | 'createdAt' | 'updatedAt'>): Promise<Report> {
    const report: Report = {
      ...reportData,
      id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.reports.set(report.id, report);
    await this.saveReport(report);

    return report;
  }

  /**
   * Generate report
   */
  async generateReport(reportId: string, parameters?: Record<string, any>): Promise<{
    report: Report;
    data: any;
    downloadUrl?: string;
  }> {
    const report = this.reports.get(reportId);
    if (!report) {
      throw new Error('Report not found');
    }

    const reportData = await this.executeReport(report, parameters);
    
    let downloadUrl: string | undefined;
    if (report.format !== 'json') {
      downloadUrl = await this.exportReport(report, reportData);
    }

    return {
      report,
      data: reportData,
      downloadUrl,
    };
  }

  /**
   * Run cohort analysis
   */
  async runCohortAnalysis(cohortId: string): Promise<CohortAnalysis> {
    const cohort = this.cohorts.get(cohortId);
    if (!cohort) {
      throw new Error('Cohort not found');
    }

    const analysis = await this.calculateCohortRetention(cohort);
    await this.saveCohortAnalysis(analysis);

    return analysis;
  }

  /**
   * Get user journey
   */
  async getUserJourney(userId: string, sessionId?: string): Promise<{
    events: AnalyticsEvent[];
    timeline: Array<{
      timestamp: Date;
      event: string;
      properties: any;
      page?: string;
    }>;
    funnel_progress: Array<{
      funnelId: string;
      funnelName: string;
      currentStep: number;
      totalSteps: number;
      conversionProbability: number;
    }>;
  }> {
    const events = Array.from(this.events.values())
      .filter(event => {
        if (sessionId) {
          return event.sessionId === sessionId;
        }
        return event.userId === userId;
      })
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    const timeline = events.map(event => ({
      timestamp: event.timestamp,
      event: event.eventName,
      properties: event.properties,
      page: event.page?.path,
    }));

    const funnel_progress = await this.calculateUserFunnelProgress(userId, events);

    return {
      events,
      timeline,
      funnel_progress,
    };
  }

  /**
   * Get attribution analysis
   */
  async getAttributionAnalysis(
    conversionEvent: string,
    lookbackDays: number = 30
  ): Promise<{
    channels: Array<{
      channel: string;
      first_touch: number;
      last_touch: number;
      linear: number;
      time_decay: number;
      position_based: number;
    }>;
    models: {
      first_touch: number;
      last_touch: number;
      linear: number;
      time_decay: number;
      position_based: number;
    };
  }> {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - lookbackDays * 24 * 60 * 60 * 1000);
    
    const conversions = await this.getConversionEvents(conversionEvent, startDate, endDate);
    const attribution = await this.calculateAttribution(conversions, lookbackDays);

    return attribution;
  }

  /**
   * Real-time analytics
   */
  async getRealTimeStats(): Promise<{
    current_users: number;
    page_views_last_hour: number;
    top_pages: Array<{ page: string; views: number }>;
    traffic_sources: Array<{ source: string; users: number }>;
    conversion_events_last_hour: number;
    active_sessions: number;
  }> {
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const thirtyMinutesAgo = new Date(now.getTime() - 30 * 60 * 1000);

    const recentEvents = Array.from(this.events.values())
      .filter(event => event.timestamp >= oneHourAgo);

    const activeUsers = new Set(
      Array.from(this.events.values())
        .filter(event => event.timestamp >= thirtyMinutesAgo)
        .map(event => event.sessionId)
    ).size;

    const pageViews = recentEvents.filter(event => event.eventName === 'page_view').length;

    const pageViewCounts = new Map<string, number>();
    recentEvents
      .filter(event => event.eventName === 'page_view' && event.page)
      .forEach(event => {
        const page = event.page!.path;
        pageViewCounts.set(page, (pageViewCounts.get(page) || 0) + 1);
      });

    const topPages = Array.from(pageViewCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, views]) => ({ page, views }));

    const sourceCounts = new Map<string, Set<string>>();
    recentEvents.forEach(event => {
      const source = event.utm.source || event.referrer || 'direct';
      if (!sourceCounts.has(source)) {
        sourceCounts.set(source, new Set());
      }
      sourceCounts.get(source)!.add(event.sessionId);
    });

    const trafficSources = Array.from(sourceCounts.entries())
      .map(([source, sessions]) => ({ source, users: sessions.size }))
      .sort((a, b) => b.users - a.users);

    const conversionEvents = recentEvents.filter(event => 
      ['purchase', 'signup', 'affiliate_signup'].includes(event.eventName)
    ).length;

    const activeSessions = new Set(
      recentEvents.map(event => event.sessionId)
    ).size;

    return {
      current_users: activeUsers,
      page_views_last_hour: pageViews,
      top_pages: topPages,
      traffic_sources: trafficSources,
      conversion_events_last_hour: conversionEvents,
      active_sessions: activeSessions,
    };
  }

  /**
   * A/B test analysis
   */
  async analyzeABTest(testName: string): Promise<{
    variants: Array<{
      name: string;
      users: number;
      conversions: number;
      conversion_rate: number;
      confidence: number;
      is_winner: boolean;
    }>;
    statistical_significance: boolean;
    recommended_action: 'continue' | 'declare_winner' | 'stop_test';
  }> {
    const testEvents = Array.from(this.events.values())
      .filter(event => event.properties.ab_test === testName);

    if (testEvents.length === 0) {
      throw new Error('No data found for A/B test');
    }

    return this.calculateABTestResults(testEvents);
  }

  /**
   * Private helper methods
   */
  private initializeDefaultKPIs(): void {
    const defaultKPIs: Omit<KPI, 'id'>[] = [
      {
        name: 'Total Revenue',
        category: 'sales',
        description: 'Total revenue across all channels',
        formula: 'SUM(order_value)',
        query: 'SELECT SUM(total) FROM orders WHERE status = "completed"',
        thresholds: { good: 10000, warning: 5000, critical: 1000 },
        format: 'currency',
        refreshInterval: 60,
        isActive: true,
      },
      {
        name: 'Conversion Rate',
        category: 'marketing',
        description: 'Percentage of visitors who make a purchase',
        formula: '(purchases / unique_visitors) * 100',
        query: 'SELECT (COUNT(DISTINCT purchase_events.session_id) / COUNT(DISTINCT all_events.session_id)) * 100',
        thresholds: { good: 5, warning: 2, critical: 1 },
        format: 'percentage',
        refreshInterval: 30,
        isActive: true,
      },
      {
        name: 'Affiliate Signups',
        category: 'affiliate',
        description: 'Number of new affiliate signups',
        formula: 'COUNT(affiliate_signups)',
        query: 'SELECT COUNT(*) FROM affiliate_signups WHERE created_at >= CURRENT_DATE',
        thresholds: { good: 10, warning: 5, critical: 1 },
        format: 'number',
        refreshInterval: 60,
        isActive: true,
      },
      {
        name: 'Radio Listeners',
        category: 'radio',
        description: 'Current live radio listeners',
        formula: 'COUNT(active_streams)',
        query: 'SELECT COUNT(DISTINCT session_id) FROM radio_events WHERE event = "stream_start" AND timestamp >= NOW() - INTERVAL 1 HOUR',
        thresholds: { good: 100, warning: 50, critical: 10 },
        format: 'number',
        refreshInterval: 5,
        isActive: true,
      },
    ];

    defaultKPIs.forEach(kpiData => {
      const kpi: KPI = {
        ...kpiData,
        id: `kpi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      };
      this.kpis.set(kpi.id, kpi);
    });
  }

  private initializeDefaultFunnels(): void {
    // Purchase funnel
    const purchaseFunnel: Funnel = {
      id: 'purchase_funnel',
      name: 'Purchase Funnel',
      description: 'Track user journey from landing to purchase',
      steps: [
        { id: 'step1', name: 'Landing', eventName: 'page_view', order: 1 },
        { id: 'step2', name: 'Product View', eventName: 'product_view', order: 2 },
        { id: 'step3', name: 'Add to Cart', eventName: 'add_to_cart', order: 3 },
        { id: 'step4', name: 'Checkout', eventName: 'checkout_start', order: 4 },
        { id: 'step5', name: 'Purchase', eventName: 'purchase', order: 5 },
      ],
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    };

    this.funnels.set(purchaseFunnel.id, purchaseFunnel);

    // Affiliate signup funnel
    const affiliateFunnel: Funnel = {
      id: 'affiliate_funnel',
      name: 'Affiliate Signup Funnel',
      description: 'Track affiliate conversion process',
      steps: [
        { id: 'step1', name: 'Affiliate Page Visit', eventName: 'page_view', conditions: [{ property: 'page.path', operator: 'equals', value: '/affiliate' }], order: 1 },
        { id: 'step2', name: 'Telegram Click', eventName: 'telegram_click', order: 2 },
        { id: 'step3', name: 'Claim Command', eventName: 'telegram_claim', order: 3 },
        { id: 'step4', name: 'Signup Complete', eventName: 'affiliate_signup', order: 4 },
      ],
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
    };

    this.funnels.set(affiliateFunnel.id, affiliateFunnel);
  }

  private async calculateFunnelMetrics(funnel: Funnel, events: AnalyticsEvent[]): Promise<FunnelResult> {
    const userJourneys = new Map<string, AnalyticsEvent[]>();
    
    // Group events by user/session
    events.forEach(event => {
      const key = event.userId || event.sessionId;
      if (!userJourneys.has(key)) {
        userJourneys.set(key, []);
      }
      userJourneys.get(key)!.push(event);
    });

    const stepResults = funnel.steps.map(step => ({
      stepId: step.id,
      stepName: step.name,
      users: 0,
      conversionRate: 0,
      dropoffRate: 0,
      avgTimeToNext: 0,
    }));

    let totalUsers = 0;
    let usersInStep = new Array(funnel.steps.length).fill(0);

    // Analyze each user journey
    userJourneys.forEach(journey => {
      journey.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
      
      let currentStep = 0;
      let hasEnteredFunnel = false;

      for (const event of journey) {
        const step = funnel.steps[currentStep];
        if (!step) break;

        if (this.eventMatchesStep(event, step)) {
          if (!hasEnteredFunnel) {
            totalUsers++;
            hasEnteredFunnel = true;
          }
          usersInStep[currentStep]++;
          currentStep++;
        }
      }
    });

    // Calculate conversion rates
    for (let i = 0; i < stepResults.length; i++) {
      stepResults[i].users = usersInStep[i];
      
      if (i === 0) {
        stepResults[i].conversionRate = totalUsers > 0 ? (usersInStep[i] / totalUsers) * 100 : 0;
      } else {
        stepResults[i].conversionRate = usersInStep[i - 1] > 0 ? (usersInStep[i] / usersInStep[i - 1]) * 100 : 0;
      }
      
      stepResults[i].dropoffRate = 100 - stepResults[i].conversionRate;
    }

    const overallConversionRate = totalUsers > 0 ? 
      (usersInStep[usersInStep.length - 1] / totalUsers) * 100 : 0;

    return {
      funnelId: funnel.id,
      totalUsers,
      steps: stepResults,
      overallConversionRate,
      generatedAt: new Date(),
    };
  }

  private eventMatchesStep(event: AnalyticsEvent, step: FunnelStep): boolean {
    if (event.eventName !== step.eventName) {
      return false;
    }

    if (step.conditions) {
      return step.conditions.every(condition => {
        const value = this.getPropertyValue(event, condition.property);
        return this.evaluateCondition(value, condition.operator, condition.value);
      });
    }

    return true;
  }

  private getPropertyValue(event: AnalyticsEvent, property: string): any {
    const parts = property.split('.');
    let value: any = event;
    
    for (const part of parts) {
      value = value?.[part];
    }
    
    return value;
  }

  private evaluateCondition(value: any, operator: string, expectedValue: any): boolean {
    switch (operator) {
      case 'equals':
        return value === expectedValue;
      case 'contains':
        return String(value).includes(String(expectedValue));
      case 'greater':
        return Number(value) > Number(expectedValue);
      case 'less':
        return Number(value) < Number(expectedValue);
      case 'exists':
        return value !== undefined && value !== null;
      default:
        return false;
    }
  }

  private async calculateKPI(kpi: KPI): Promise<KPIValue> {
    // This would execute the actual query against the database
    // For now, return mock data
    const value = Math.random() * 1000;
    const change = (Math.random() - 0.5) * 100;
    const changePercentage = Math.random() * 20 - 10;

    let status: 'good' | 'warning' | 'critical' = 'good';
    if (value < kpi.thresholds.critical) status = 'critical';
    else if (value < kpi.thresholds.warning) status = 'warning';

    return {
      kpiId: kpi.id,
      value,
      change,
      changePercentage,
      trend: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      status,
      timestamp: new Date(),
      period: 'last_24h',
    };
  }

  private async calculateCohortRetention(cohort: Cohort): Promise<CohortAnalysis> {
    // Implementation would calculate actual cohort retention
    // For now, return mock data
    const cohorts: Array<{
      period: string;
      size: number;
      retention: number[];
    }> = [];
    const startDate = new Date(cohort.dateRange.start);
    const endDate = new Date(cohort.dateRange.end);
    
    while (startDate <= endDate) {
      const periodKey = startDate.toISOString().split('T')[0];
      const size = Math.floor(Math.random() * 100) + 50;
      const retention = cohort.periods.map(period => {
        return Math.max(0, Math.min(100, 100 - (period * 5) + (Math.random() * 20 - 10)));
      });
      
      cohorts.push({
        period: periodKey,
        size,
        retention,
      });
      
      startDate.setDate(startDate.getDate() + 7); // Weekly cohorts
    }

    const averageRetention = cohort.periods.map(period => {
      const total = cohorts.reduce((sum, c) => sum + (c.retention[period] || 0), 0);
      return cohorts.length > 0 ? total / cohorts.length : 0;
    });

    return {
      cohortId: cohort.id,
      cohorts,
      averageRetention,
      generatedAt: new Date(),
    };
  }

  private async calculateUserFunnelProgress(userId: string, events: AnalyticsEvent[]): Promise<any[]> {
    // Implementation would calculate user's progress through each funnel
    return [];
  }

  private async getConversionEvents(eventName: string, startDate: Date, endDate: Date): Promise<AnalyticsEvent[]> {
    return Array.from(this.events.values()).filter(event =>
      event.eventName === eventName &&
      event.timestamp >= startDate &&
      event.timestamp <= endDate
    );
  }

  private async calculateAttribution(conversions: AnalyticsEvent[], lookbackDays: number): Promise<any> {
    // Implementation would calculate attribution models
    return {
      channels: [],
      models: {
        first_touch: 0,
        last_touch: 0,
        linear: 0,
        time_decay: 0,
        position_based: 0,
      },
    };
  }

  private async calculateABTestResults(testEvents: AnalyticsEvent[]): Promise<any> {
    // Implementation would calculate A/B test statistical significance
    return {
      variants: [],
      statistical_significance: false,
      recommended_action: 'continue' as const,
    };
  }

  /**
   * Database operations (placeholder implementations)
   */
  private async saveEvent(event: AnalyticsEvent): Promise<void> {
    console.log('Saving event:', event.eventName);
  }

  private async saveFunnel(funnel: Funnel): Promise<void> {
    console.log('Saving funnel:', funnel.name);
  }

  private async saveReport(report: Report): Promise<void> {
    console.log('Saving report:', report.name);
  }

  private async saveFunnelResult(result: FunnelResult): Promise<void> {
    console.log('Saving funnel result:', result.funnelId);
  }

  private async saveCohortAnalysis(analysis: CohortAnalysis): Promise<void> {
    console.log('Saving cohort analysis:', analysis.cohortId);
  }

  private async getEventsInDateRange(start: Date, end: Date): Promise<AnalyticsEvent[]> {
    return Array.from(this.events.values()).filter(event =>
      event.timestamp >= start && event.timestamp <= end
    );
  }

  private async executeReport(report: Report, parameters?: Record<string, any>): Promise<any> {
    // Implementation would execute report queries
    return { data: 'report_data' };
  }

  private async exportReport(report: Report, data: any): Promise<string> {
    // Implementation would export report to file and return URL
    return 'https://example.com/reports/export.pdf';
  }

  private async processRealTimeEvent(event: AnalyticsEvent): Promise<void> {
    // Implementation would process real-time analytics
    console.log('Processing real-time event:', event.eventName);
  }
}

// Initialize advanced analytics
export const advancedAnalytics = new AdvancedAnalytics();