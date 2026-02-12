import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as puppeteer from 'puppeteer';
import * as Handlebars from 'handlebars';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {
    this.registerHandlebarsHelpers();
  }

  private registerHandlebarsHelpers() {
    // Helper format currency
    Handlebars.registerHelper('formatCurrency', (amount: number) => {
      return new Intl.NumberFormat('vi-VN').format(Math.round(amount || 0));
    });

    // Helper format date
    Handlebars.registerHelper('formatDate', (date: Date) => {
      if (!date) return '';
      return new Date(date).toLocaleDateString('vi-VN');
    });

    // Helper format datetime
    Handlebars.registerHelper('formatDateTime', (date: Date) => {
      if (!date) return '';
      return new Date(date).toLocaleString('vi-VN');
    });

    // Helper for math operations
    Handlebars.registerHelper('add', (a, b) => a + b);
    Handlebars.registerHelper('subtract', (a, b) => a - b);
    Handlebars.registerHelper('multiply', (a, b) => a * b);
    Handlebars.registerHelper('divide', (a, b) => b !== 0 ? a / b : 0);

    // Helper for conditional
    Handlebars.registerHelper('eq', (a, b) => a === b);
    Handlebars.registerHelper('gt', (a, b) => a > b);
    Handlebars.registerHelper('lt', (a, b) => a < b);
    Handlebars.registerHelper('gte', (a, b) => a >= b);
    Handlebars.registerHelper('lte', (a, b) => a <= b);
  }

  // Get all templates
  async getTemplates(templateType?: string) {
    return this.prisma.printTemplate.findMany({
      where: templateType ? { templateType, isActive: true } : { isActive: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Get template by ID
  async getTemplate(id: string) {
    return this.prisma.printTemplate.findUnique({
      where: { id },
    });
  }

  // Get template by code
  async getTemplateByCode(code: string) {
    return this.prisma.printTemplate.findUnique({
      where: { code },
    });
  }

  // Create template
  async createTemplate(data: any) {
    return this.prisma.printTemplate.create({
      data,
    });
  }

  // Update template
  async updateTemplate(id: string, data: any) {
    return this.prisma.printTemplate.update({
      where: { id },
      data,
    });
  }

  // Generate document number
  async generateDocumentNumber(
    documentType: string,
    prefix: string,
    departmentId?: string,
  ): Promise<string> {
    const year = new Date().getFullYear();

    const numbering = await this.prisma.documentNumbering.upsert({
      where: {
        prefix_year_documentType: {
          prefix,
          year,
          documentType,
        },
      },
      update: {
        sequence: { increment: 1 },
      },
      create: {
        prefix,
        year,
        documentType,
        departmentId: departmentId || null,
        sequence: 1,
      },
    });

    const docNumber = `${prefix}${String(numbering.sequence).padStart(3, '0')}/${year}`;

    await this.prisma.documentNumbering.update({
      where: { id: numbering.id },
      data: { lastNumber: docNumber },
    });

    return docNumber;
  }

  // Render HTML from template
  async renderTemplate(templateId: string, data: any): Promise<string> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error('Template not found');
    }

    const compiledTemplate = Handlebars.compile(template.htmlTemplate);
    const compiledHeader = template.headerTemplate
      ? Handlebars.compile(template.headerTemplate)
      : null;
    const compiledFooter = template.footerTemplate
      ? Handlebars.compile(template.footerTemplate)
      : null;

    const header = compiledHeader ? compiledHeader(data) : '';
    const footer = compiledFooter ? compiledFooter(data) : '';
    const body = compiledTemplate(data);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @page {
            size: ${template.paperSize} ${template.orientation};
            margin: 20mm;
          }
          body {
            font-family: 'Times New Roman', Times, serif;
            font-size: 13px;
            line-height: 1.5;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #000;
            padding: 5px;
            text-align: left;
          }
          th {
            background-color: #f0f0f0;
            font-weight: bold;
          }
          .text-center { text-align: center; }
          .text-right { text-align: right; }
          .text-bold { font-weight: bold; }
          .header { margin-bottom: 20px; }
          .footer { margin-top: 20px; }
          .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 30px;
          }
          .signature-box {
            text-align: center;
            width: 30%;
          }
        </style>
      </head>
      <body>
        ${header ? `<div class="header">${header}</div>` : ''}
        <div class="content">${body}</div>
        ${footer ? `<div class="footer">${footer}</div>` : ''}
      </body>
      </html>
    `;
  }

  // Generate PDF from template
  async generatePDF(templateId: string, data: any): Promise<Buffer> {
    const html = await this.renderTemplate(templateId, data);

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    try {
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });

      const template = await this.getTemplate(templateId);
      const pdf = await page.pdf({
        format: template.paperSize as any,
        landscape: template.orientation === 'landscape',
        printBackground: true,
      });

      return Buffer.from(pdf);
    } finally {
      await browser.close();
    }
  }

  // Log print action
  async logPrint(data: {
    templateId: string;
    periodId?: string;
    documentNumber?: string;
    documentDate?: Date;
    printedBy: string;
    fileUrl?: string;
    metadata?: any;
  }) {
    return this.prisma.printLog.create({
      data: {
        ...data,
        printedAt: new Date(),
      },
    });
  }

  // Get print history
  async getPrintHistory(periodId?: string) {
    return this.prisma.printLog.findMany({
      where: periodId ? { periodId } : {},
      include: {
        template: true,
        period: true,
      },
      orderBy: { printedAt: 'desc' },
      take: 100,
    });
  }
}
