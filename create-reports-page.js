const fs = require('fs');

const content = `import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FileDown, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';
import { Button } from '../../components/common/Button';
import api from '../../lib/api';
import { PayrollPeriod } from '../../types/payroll';

type ReportType = 'department' | 'comparison' | 'tax' | 'insurance';

export function PayrollReportsPage() {
  const [selectedReport, setSelectedReport] = useState<ReportType>('department');
  const [selectedPeri