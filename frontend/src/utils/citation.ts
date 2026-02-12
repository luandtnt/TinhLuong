import { CitationStyle, ContentType, CitationFields, CommonFields } from '../types/content';

interface RenderCitationParams {
  style: CitationStyle;
  type: ContentType;
  common: Partial<CommonFields>;
  citation: Partial<CitationFields>;
  specific: any;
}

export function renderCitation(params: RenderCitationParams): string {
  const { style, type, common, citation, specific } = params;

  // Check required fields
  if (!common.authors || common.authors.length === 0 || !common.title) {
    return 'Chưa đủ thông tin để tạo trích dẫn chuẩn.';
  }

  if (style === 'APA7') {
    return renderAPA7(type, common, citation, specific);
  } else {
    return renderHarvard(type, common, citation, specific);
  }
}

function formatAuthors(authors: string[], style: 'APA7' | 'HARVARD'): string {
  if (authors.length === 0) return '';
  if (authors.length === 1) return authors[0];
  if (authors.length === 2) return `${authors[0]} & ${authors[1]}`;
  
  if (style === 'APA7') {
    return `${authors[0]} et al.`;
  } else {
    return `${authors[0]} và cs.`;
  }
}

function renderAPA7(
  type: ContentType,
  common: Partial<CommonFields>,
  citation: Partial<CitationFields>,
  specific: any
): string {
  const authors = formatAuthors(common.authors || [], 'APA7');
  const title = common.title || '';
  
  switch (type) {
    case 'VAN_BAN': {
      const year = specific?.issueYear || specific?.issueDate?.split('/')[2] || 'n.d.';
      const issuer = specific?.issuer || common.organization || '';
      let result = `${authors}. (${year}). ${title}`;
      if (issuer) result += `. ${issuer}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        result += `. Retrieved from ${citation.url}`;
      }
      return result;
    }
    
    case 'SACH': {
      const year = specific?.publishYear || 'n.d.';
      const publisher = specific?.publisher || '';
      const location = specific?.publishLocation || '';
      let result = `${authors}. (${year}). ${title}`;
      if (specific?.edition) result += ` (${specific.edition})`;
      if (location && publisher) {
        result += `. ${location}: ${publisher}`;
      } else if (publisher) {
        result += `. ${publisher}`;
      }
      return result;
    }
    
    case 'AUDIO': {
      const date = specific?.releaseDate || 'n.d.';
      const platform = specific?.platform || '';
      let result = `${authors}. (${date}). ${title} [Audio]`;
      if (platform) result += `. ${platform}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        result += `. ${citation.url}`;
      }
      return result;
    }
    
    case 'VIDEO': {
      const date = specific?.releaseDate || 'n.d.';
      const platform = specific?.platform || '';
      let result = `${authors}. (${date}). ${title} [Video]`;
      if (platform) result += `. ${platform}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        result += `. ${citation.url}`;
      }
      return result;
    }
    
    case 'HINH_ANH': {
      const date = specific?.creationDate || 'n.d.';
      let result = `${authors}. (${date}). ${title} [Hình ảnh]`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        result += `. Retrieved from ${citation.url}`;
      }
      return result;
    }
    
    default:
      return 'Chưa đủ thông tin để tạo trích dẫn chuẩn.';
  }
}

function renderHarvard(
  type: ContentType,
  common: Partial<CommonFields>,
  citation: Partial<CitationFields>,
  specific: any
): string {
  const authors = formatAuthors(common.authors || [], 'HARVARD');
  const title = common.title || '';
  
  switch (type) {
    case 'VAN_BAN': {
      const year = specific?.issueYear || specific?.issueDate?.split('/')[2] || 'n.d.';
      const issuer = specific?.issuer || common.organization || '';
      let result = `${authors} ${year}, '${title}'`;
      if (issuer) result += `, ${issuer}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        const accessDate = citation.accessDate || new Date().toLocaleDateString('vi-VN');
        result += `, truy cập ${accessDate}, <${citation.url}>`;
      }
      return result + '.';
    }
    
    case 'SACH': {
      const year = specific?.publishYear || 'n.d.';
      const publisher = specific?.publisher || '';
      const location = specific?.publishLocation || '';
      let result = `${authors} ${year}, ${title}`;
      if (specific?.edition) result += `, ${specific.edition}`;
      if (location && publisher) {
        result += `, ${location}: ${publisher}`;
      } else if (publisher) {
        result += `, ${publisher}`;
      }
      return result + '.';
    }
    
    case 'AUDIO': {
      const year = specific?.releaseDate?.split('/')[2] || 'n.d.';
      const platform = specific?.platform || '';
      let result = `${authors} ${year}, ${title}, podcast`;
      if (platform) result += `, ${platform}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        const accessDate = citation.accessDate || new Date().toLocaleDateString('vi-VN');
        result += `, truy cập ${accessDate}, <${citation.url}>`;
      }
      return result + '.';
    }
    
    case 'VIDEO': {
      const year = specific?.releaseDate?.split('/')[2] || 'n.d.';
      const platform = specific?.platform || '';
      let result = `${authors} ${year}, ${title}, video`;
      if (platform) result += `, ${platform}`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        const accessDate = citation.accessDate || new Date().toLocaleDateString('vi-VN');
        result += `, truy cập ${accessDate}, <${citation.url}>`;
      }
      return result + '.';
    }
    
    case 'HINH_ANH': {
      const year = specific?.creationDate?.split('/')[2] || 'n.d.';
      let result = `${authors} ${year}, ${title}, hình ảnh`;
      if (citation.sourceType === 'TRUC_TUYEN' && citation.url) {
        const accessDate = citation.accessDate || new Date().toLocaleDateString('vi-VN');
        result += `, truy cập ${accessDate}, <${citation.url}>`;
      }
      return result + '.';
    }
    
    default:
      return 'Chưa đủ thông tin để tạo trích dẫn chuẩn.';
  }
}
