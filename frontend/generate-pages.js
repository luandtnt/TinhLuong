// Script to generate all remaining document pages
const fs = require('fs');
const path = require('path');

const pageConfigs = [
  {
    name: 'PoliticalBooks',
    title: 'Sách chính trị',
    code: 'SCT',
    sampleTitle: 'Chủ nghĩa Mác - Lênin',
    author: 'Viện Triết học'
  },
  {
    name: 'PartyDocumentsComplete',
    title: 'Văn kiện Đảng toàn tập',
    code: 'VKTT',
    sampleTitle: 'Văn kiện Đại hội Đảng toàn quốc lần thứ XIII',
    author: 'Ban Chấp hành Trung ương'
  },
  {
    name: 'PartyDocumentsIntro',
    title: 'Giới thiệu văn kiện Đảng',
    code: 'GTVK',
    sampleTitle: 'Giới thiệu Nghị quyết Đại hội XIII',
    author: 'Ban Tuyên giáo Trung ương'
  },
  {
    name: 'PartyCongress',
    title: 'Văn kiện Đại hội Đảng',
    code: 'VKDH',
    sampleTitle: 'Văn kiện Đại hội đại biểu toàn quốc lần thứ XIII',
    author: 'Đại hội Đảng toàn quốc'
  },
  {
    name: 'CentralCommitteeMeeting',
    title: 'Hội nghị BCH Trung ương',
    code: 'HNBCH',
    sampleTitle: 'Nghị quyết Hội nghị lần thứ 8 BCH Trung ương',
    author: 'Ban Chấp hành Trung ương'
  }
];

console.log('Generated page configs:', pageConfigs);
