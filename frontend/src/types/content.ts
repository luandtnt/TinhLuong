// Content types and interfaces

export type ContentType = 'VAN_BAN' | 'SACH' | 'AUDIO' | 'VIDEO' | 'HINH_ANH';

export type SourceType = 'INTERNAL' | 'ONLINE';

export type ClassificationLevel = 'CONG_KHAI' | 'NOI_BO' | 'MAT' | 'TOI_MAT';

export type ContentStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED';

export type RightsType = 'NOI_BO' | 'CONG_KHAI' | 'CC' | 'DUOC_PHEP_SU_DUNG' | 'KHAC';

export interface CommonFields {
  code: string;
  title: string;
  classification: ClassificationLevel;
  authors: string[];
  organization?: string;
  summary: string;
  tags?: string[];
  language?: string;
}

export interface SourceMetadata {
  sourceType: SourceType;
  url?: string;
  accessedAt?: string;
  internalCode?: string;
  providerOrg?: string;
  rights?: RightsType;
  rightsNote?: string;
}

export interface FileMetadata {
  fileName: string;
  fileSize: number;
  fileFormat: string;
  pageCount?: number;
  duration?: number;
  resolution?: string;
  dimensions?: { width: number; height: number };
  thumbnailUrl?: string;
}

export interface VanBanFields {
  documentType: string;
  issueDate?: string;
  issueYear?: string;
  documentNumber?: string;
  issuer?: string;
  issueLocation?: string;
  effectiveStatus?: 'CON_HIEU_LUC' | 'DA_THAY_THE' | 'BAI_BO';
  relatedDocuments?: string;
}

export interface SachFields {
  publishYear: string;
  publisher: string;
  edition?: string;
  isbn?: string;
  editors?: string[];
  publishLocation?: string;
  hasTranslation: boolean;
  translator?: string;
  originalLanguage?: string;
  translatedLanguage?: string;
  translatedLanguages?: string[];
  chiefEditor?: string;
  compositionYear?: string;
  reprintEdition?: string;
  editor?: string;
  editorialDepartment?: string;
}

export interface AudioFields {
  releaseDate: string;
  platform: string;
  programName?: string;
  episodeNumber?: string;
  language?: string;
  presenter?: string;
  quality?: string;
  bandwidth?: string;
}

export interface VideoFields {
  releaseDate: string;
  platform: string;
  channelName?: string;
  eventName?: string;
  location?: string;
  language?: string;
  director?: string;
  productionCompany?: string;
  videoFormat?: string;
  screenplay?: string;
}

export interface HinhAnhFields {
  photographer?: string;
  captureDate?: string;
  location?: string;
  imageType?: string;
  caption?: string;
  collection?: string;
}

export interface ContentFormData {
  type: ContentType;
  common: CommonFields;
  sourceMetadata: SourceMetadata;
  file?: File | null;
  fileUrl?: string;
  fileMetadata?: FileMetadata;
  specific: VanBanFields | SachFields | AudioFields | VideoFields | HinhAnhFields;
}
